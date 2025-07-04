import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Dish from '@/models/Dish';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Check if id is a valid ObjectId or treat it as a slug
    let dish;
    if (mongoose.Types.ObjectId.isValid(id)) {
      dish = await Dish.findById(id).lean();
    } else {
      dish = await Dish.findOne({ slug: id }).lean();
    }

    if (!dish) {
      return NextResponse.json({
        success: false,
        error: 'Dish not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: dish
    });

  } catch (error) {
    console.error('Error fetching dish:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dish' 
      }, 
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const updateData = await request.json();

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid dish ID'
      }, { status: 400 });
    }

    // Update slug if name is being updated
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const dish = await Dish.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!dish) {
      return NextResponse.json({
        success: false,
        error: 'Dish not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: dish
    });

  } catch (error) {
    console.error('Error updating dish:', error);
    
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
        error: 'Failed to update dish' 
      }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid dish ID'
      }, { status: 400 });
    }

    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
      return NextResponse.json({
        success: false,
        error: 'Dish not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Dish deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting dish:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete dish' 
      }, 
      { status: 500 }
    );
  }
} 