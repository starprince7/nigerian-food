export const sampleDishes = [
  {
    name: "Jollof Rice",
    slug: "jollof-rice",
    tribe: "Cross-cultural",
    region: "All Regions",
    mealType: "lunch",
    difficulty: "medium",
    cookingTime: "50 minutes",
    servings: 8,
    ingredients: [
      { name: "Long grain rice", quantity: "3 cups", optional: false },
      { name: "Tomatoes", quantity: "6 large", optional: false },
      { name: "Onions", quantity: "2 large", optional: false },
      { name: "Palm oil", quantity: "1/4 cup", optional: false }
    ],
    instructions: [
      "Blend tomatoes and onions",
      "Fry blended mixture in palm oil",
      "Add rice and stock",
      "Cook until tender"
    ],
    image: "/images/dishes/placeholder.svg",
    nutritionalInfo: {
      calories: 320,
      protein: "8g",
      carbs: "58g",
      fat: "6g",
      fiber: "3g"
    },
    culturalNote: "Jollof Rice is Nigeria's most famous dish, enjoyed across all tribes.",
    tags: ["traditional", "festive"],
    popularity: 10,
    featured: true
  },
  {
    name: "Akara",
    slug: "akara-bean-cakes",
    tribe: "Yoruba",
    region: "Southwest",
    mealType: "breakfast",
    difficulty: "easy",
    cookingTime: "30 minutes",
    servings: 6,
    ingredients: [
      { name: "Black-eyed beans", quantity: "2 cups", optional: false },
      { name: "Onions", quantity: "1 medium", optional: false }
    ],
    instructions: [
      "Peel and blend beans",
      "Add onions and seasonings",
      "Deep fry until golden"
    ],
    image: "/images/dishes/placeholder.svg",
    nutritionalInfo: {
      calories: 180,
      protein: "12g",
      carbs: "15g",
      fat: "8g"
    },
    culturalNote: "Popular Yoruba breakfast food, often served with pap.",
    tags: ["vegetarian", "quick"],
    popularity: 8,
    featured: false
  }
]; 