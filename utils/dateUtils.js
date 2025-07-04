// Get today's date without time (for consistent daily suggestions)
export function getTodayDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

// Format date for display
export function formatDate(date) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

// Format date for API/database (YYYY-MM-DD)
export function formatDateForAPI(date) {
  return date.toISOString().split('T')[0];
}

// Get day of the week
export function getDayOfWeek(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

// Check if date is today
export function isToday(date) {
  const today = getTodayDate();
  return date.getTime() === today.getTime();
}

// Get a greeting based on time of day
export function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

// Get current meal time suggestion
export function getCurrentMealTime() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 11) {
    return 'breakfast';
  } else if (hour >= 11 && hour < 16) {
    return 'lunch';
  } else if (hour >= 16 && hour < 22) {
    return 'dinner';
  } else {
    return 'snack';
  }
}

// Get days until next week (for meal planning)
export function getDaysUntilNextWeek() {
  const today = new Date();
  const daysUntilSunday = 7 - today.getDay();
  return daysUntilSunday === 7 ? 0 : daysUntilSunday;
}

// Generate date range for meal planning
export function generateDateRange(startDate, days) {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
}

// Check if we need to generate new daily suggestions
export function shouldGenerateNewSuggestions(lastGeneratedDate) {
  if (!lastGeneratedDate) return true;
  
  const today = getTodayDate();
  const lastGenerated = new Date(lastGeneratedDate);
  
  return today.getTime() !== lastGenerated.getTime();
}

// Get relative time string (e.g., "2 hours ago", "yesterday")
export function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return formatDate(date);
  }
} 