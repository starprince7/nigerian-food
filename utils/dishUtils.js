import { MEAL_TYPES } from './constants';

// Generate random dishes for daily suggestions
export function generateDailySuggestions(dishes) {
  const suggestions = {};
  
  MEAL_TYPES.forEach(mealType => {
    if (mealType === 'snack') return; // Skip snacks for daily suggestions
    
    const dishesForMeal = dishes.filter(dish => dish.mealType === mealType);
    if (dishesForMeal.length > 0) {
      const randomIndex = Math.floor(Math.random() * dishesForMeal.length);
      suggestions[mealType] = dishesForMeal[randomIndex];
    }
  });
  
  return suggestions;
}

// Create a deterministic daily suggestion based on date
export function generateDeterministicDailySuggestions(dishes, date) {
  const suggestions = {};
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  const seed = hashCode(dateString);
  
  MEAL_TYPES.forEach((mealType, index) => {
    if (mealType === 'snack') return;
    
    const dishesForMeal = dishes.filter(dish => dish.mealType === mealType);
    if (dishesForMeal.length > 0) {
      const randomIndex = seededRandom(seed + index) % dishesForMeal.length;
      suggestions[mealType] = dishesForMeal[randomIndex];
    }
  });
  
  return suggestions;
}

// Simple hash function for string
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Seeded random number generator
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * 1000);
}

// Filter dishes by tribe
export function filterDishesByTribe(dishes, tribe) {
  if (!tribe || tribe === 'All Tribes') {
    return dishes;
  }
  return dishes.filter(dish => dish.tribe === tribe);
}

// Filter dishes by meal type
export function filterDishesByMealType(dishes, mealType) {
  if (!mealType || mealType === 'all') {
    return dishes;
  }
  return dishes.filter(dish => dish.mealType === mealType);
}

// Filter dishes by dietary restrictions
export function filterDishesByDietaryRestrictions(dishes, restrictions) {
  if (!restrictions || restrictions.length === 0) {
    return dishes;
  }
  
  return dishes.filter(dish => {
    return restrictions.every(restriction => {
      return dish.tags && dish.tags.includes(restriction);
    });
  });
}

// Filter dishes by spice level
export function filterDishesBySpiceLevel(dishes, spiceLevel) {
  if (!spiceLevel) {
    return dishes;
  }
  
  // This is a simplified filter - in a real app, you'd have spice level data
  if (spiceLevel === 'mild') {
    return dishes.filter(dish => !dish.tags || !dish.tags.includes('spicy'));
  } else if (spiceLevel === 'spicy') {
    return dishes.filter(dish => dish.tags && dish.tags.includes('spicy'));
  }
  
  return dishes; // medium or no preference
}

// Search dishes by name or cultural note
export function searchDishes(dishes, searchTerm) {
  if (!searchTerm) {
    return dishes;
  }
  
  const term = searchTerm.toLowerCase();
  return dishes.filter(dish => 
    dish.name.toLowerCase().includes(term) ||
    (dish.culturalNote && dish.culturalNote.toLowerCase().includes(term)) ||
    dish.tribe.toLowerCase().includes(term)
  );
}

// Sort dishes by various criteria
export function sortDishes(dishes, sortBy) {
  const sortedDishes = [...dishes];
  
  switch (sortBy) {
    case 'name':
      return sortedDishes.sort((a, b) => a.name.localeCompare(b.name));
    case 'popularity':
      return sortedDishes.sort((a, b) => b.popularity - a.popularity);
    case 'difficulty':
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return sortedDishes.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    case 'cookingTime':
      return sortedDishes.sort((a, b) => {
        // Extract minutes from cooking time strings like "30 minutes"
        const timeA = parseInt(a.cookingTime.match(/\d+/)?.[0] || 0);
        const timeB = parseInt(b.cookingTime.match(/\d+/)?.[0] || 0);
        return timeA - timeB;
      });
    case 'newest':
      return sortedDishes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sortedDishes;
  }
}

// Get random dishes from a filtered set
export function getRandomDishes(dishes, count = 3) {
  const shuffled = [...dishes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Create dish slug from name
export function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Format cooking time for display
export function formatCookingTime(cookingTime) {
  return cookingTime.replace(/(\d+)/, '$1');
}

// Get featured dishes
export function getFeaturedDishes(dishes) {
  return dishes.filter(dish => dish.featured);
}

// Get dishes by popularity
export function getPopularDishes(dishes, limit = 10) {
  return sortDishes(dishes, 'popularity').slice(0, limit);
} 