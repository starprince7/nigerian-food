'use client';

import { useState, useEffect } from 'react';
import MealCard from './MealCard';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { sampleDishes } from '@/lib/sampleDishes';
import { formatDate, getTodayDate, getTimeBasedGreeting } from '@/utils/dateUtils';

const DailyMealSuggestions = ({ 
  initialSuggestions = null,
  onRefresh = null,
  showRefreshButton = true,
  date = null
}) => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [isLoading, setIsLoading] = useState(!initialSuggestions);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const targetDate = date || getTodayDate();
  const formattedDate = formatDate(targetDate);
  const greeting = getTimeBasedGreeting();

  // Fetch daily suggestions
  const fetchSuggestions = async (refresh = false) => {
    try {
      setError(null);
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const dateParam = date ? `?date=${date.toISOString().split('T')[0]}` : '';
      const refreshParam = refresh ? (date ? '&refresh=true' : '?refresh=true') : '';
      
      const response = await fetch(`/api/dishes/daily${dateParam}${refreshParam}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch suggestions');
      }

      setSuggestions(data.data.suggestions);
      
      if (onRefresh && refresh) {
        onRefresh(data.data.suggestions);
      }

    } catch (err) {
      console.error('Error fetching daily suggestions:', err);
      // Fallback to sample dishes
      const fallback = {
        breakfast: sampleDishes[0] || null,
        lunch: sampleDishes[1] || sampleDishes[0] || null,
        dinner: sampleDishes[2] || sampleDishes[1] || sampleDishes[0] || null,
      };
      setSuggestions(fallback);
      setError(null);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch suggestions on component mount if not provided
  useEffect(() => {
    if (!initialSuggestions) {
      fetchSuggestions();
    }
  }, [date]);

  const handleRefresh = () => {
    fetchSuggestions(true);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold">Unable to load daily suggestions</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
        <Button onClick={() => fetchSuggestions()} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" showText text="Loading today's delicious suggestions..." />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {greeting}! 🍽️
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Here are your Nigerian food suggestions for {formattedDate}
        </p>
        {showRefreshButton && (
          <Button
            onClick={handleRefresh}
            loading={isRefreshing}
            variant="outline"
            className="inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Suggestions
          </Button>
        )}
      </div>

      {/* Meal Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Breakfast */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              🌅 Breakfast
            </h2>
            <p className="text-sm text-gray-600">Start your day right</p>
          </div>
          <MealCard 
            dish={suggestions?.breakfast} 
            mealType="breakfast"
            showMealType={false}
          />
        </div>

        {/* Lunch */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              ☀️ Lunch
            </h2>
            <p className="text-sm text-gray-600">Fuel your afternoon</p>
          </div>
          <MealCard 
            dish={suggestions?.lunch} 
            mealType="lunch"
            showMealType={false}
          />
        </div>

        {/* Dinner */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              🌙 Dinner
            </h2>
            <p className="text-sm text-gray-600">End the day deliciously</p>
          </div>
          <MealCard 
            dish={suggestions?.dinner} 
            mealType="dinner"
            showMealType={false}
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-gray-500">
        <p>
          These suggestions change daily and represent the rich diversity of Nigerian cuisine across all regions.
        </p>
        <p className="mt-1">
          Click on any dish to view the full recipe and cooking instructions.
        </p>
      </div>
    </div>
  );
};

export default DailyMealSuggestions; 