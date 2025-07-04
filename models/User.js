import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  favoriteTribes: [{
    type: String,
    enum: ['Yoruba', 'Igbo', 'Hausa', 'Fulani', 'Efik', 'Tiv', 'Edo']
  }],
  favoriteDishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }],
  preferences: {
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'spicy'],
      default: 'medium'
    },
    dietaryRestrictions: [{
      type: String,
      enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free']
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema); 