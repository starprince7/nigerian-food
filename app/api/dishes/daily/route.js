import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Dish from '@/models/Dish';
import DailySuggestion from '@/models/DailySuggestion';
import { generateDeterministicDailySuggestions } from '@/utils/dishUtils';
import { getTodayDate, formatDateForAPI } from '@/utils/dateUtils';

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    const refresh = searchParams.get('refresh') === 'true';

    const targetDate = dateParam ? new Date(dateParam) : getTodayDate();

    let dailySuggestion = await DailySuggestion.findOne({ 
      date: targetDate 
    }).populate('breakfast lunch dinner');

    if (!dailySuggestion || refresh) {
      const allDishes = await Dish.find({}).lean();
      
      if (allDishes.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'No dishes available'
        }, { status: 404 });
      }

      const suggestions = generateDeterministicDailySuggestions(allDishes, targetDate);

      if (dailySuggestion) {
        dailySuggestion.breakfast = suggestions.breakfast._id;
        dailySuggestion.lunch = suggestions.lunch._id;
        dailySuggestion.dinner = suggestions.dinner._id;
        await dailySuggestion.save();
      } else {
        dailySuggestion = await DailySuggestion.create({
          date: targetDate,
          breakfast: suggestions.breakfast._id,
          lunch: suggestions.lunch._id,
          dinner: suggestions.dinner._id
        });
      }
      
      dailySuggestion = await DailySuggestion.findOne({ 
        date: targetDate 
      }).populate('breakfast lunch dinner');
    }

    return NextResponse.json({
      success: true,
      data: {
        date: formatDateForAPI(targetDate),
        suggestions: {
          breakfast: dailySuggestion.breakfast,
          lunch: dailySuggestion.lunch,
          dinner: dailySuggestion.dinner
        }
      }
    });

  } catch (error) {
    console.error('Error fetching daily suggestions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch daily suggestions' }, 
      { status: 500 }
    );
  }
} 