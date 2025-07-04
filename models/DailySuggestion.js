import mongoose from 'mongoose';

const dailySuggestionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  breakfast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  lunch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  dinner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.DailySuggestion || mongoose.model('DailySuggestion', dailySuggestionSchema); 