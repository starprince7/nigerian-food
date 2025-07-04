import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  optional: { type: Boolean, default: false }
});

const nutritionalInfoSchema = new mongoose.Schema({
  calories: Number,
  protein: String,
  carbs: String,
  fat: String,
  fiber: String
});

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  tribe: {
    type: String,
    required: true,
    enum: ['Yoruba', 'Igbo', 'Hausa', 'Fulani', 'Efik', 'Tiv', 'Edo', 'Cross-cultural']
  },
  region: {
    type: String,
    required: true,
    enum: ['Southwest', 'Southeast', 'North', 'Northeast', 'South-South', 'Middle Belt', 'All Regions']
  },
  mealType: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  cookingTime: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: [{
    type: String,
    required: true
  }],
  image: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: null
  },
  nutritionalInfo: nutritionalInfoSchema,
  culturalNote: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    enum: ['spicy', 'vegetarian', 'vegan', 'traditional', 'festive', 'quick', 'healthy', 'comfort-food']
  }],
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better search performance
dishSchema.index({ name: 'text', culturalNote: 'text' });
dishSchema.index({ tribe: 1, mealType: 1 });

export default mongoose.models.Dish || mongoose.model('Dish', dishSchema); 