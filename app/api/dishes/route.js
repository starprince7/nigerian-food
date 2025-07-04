import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Dish from '@/models/Dish';
// Removed unused helper imports to satisfy linter

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const tribe = searchParams.get('tribe');
    const mealType = searchParams.get('mealType');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'name';
    const featured = searchParams.get('featured') === 'true';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build MongoDB query
    let query = {};
    
    if (tribe && tribe !== 'All Tribes') {
      query.tribe = tribe;
    }
    
    if (mealType && mealType !== 'all') {
      query.mealType = mealType;
    }
    
    if (featured) {
      query.featured = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { culturalNote: { $regex: search, $options: 'i' } },
        { tribe: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const total = await Dish.countDocuments(query);

    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'name':
        sort = { name: 1 };
        break;
      case 'popularity':
        sort = { popularity: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'difficulty':
        // Custom sort for difficulty (easy -> medium -> hard)
        sort = { difficulty: 1 };
        break;
      default:
        sort = { name: 1 };
    }

    // Fetch dishes
    const dishes = await Dish.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      success: true,
      data: {
        dishes,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore,
          hasPrevious: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching dishes:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dishes' 
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const dishData = await request.json();
    
    // Create slug from name if not provided
    if (!dishData.slug) {
      dishData.slug = dishData.name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const dish = await Dish.create(dishData);

    return NextResponse.json({
      success: true,
      data: dish
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating dish:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A dish with this name or slug already exists' 
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create dish' 
      }, 
      { status: 500 }
    );
  }
} 