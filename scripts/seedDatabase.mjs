import { connectToDatabase } from '../lib/mongodb.js';
import Dish from '../models/Dish.js';
import { sampleDishes } from '../lib/sampleDishes.js';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectToDatabase();
    console.log('✅ Connected to database');

    // Clear existing dishes (optional - remove this if you want to keep existing data)
    await Dish.deleteMany({});
    console.log('🗑️  Cleared existing dishes');

    // Insert sample dishes
    const insertedDishes = await Dish.insertMany(sampleDishes);
    console.log(`✅ Inserted ${insertedDishes.length} dishes`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    const dishCounts = await Dish.aggregate([
      {
        $group: {
          _id: '$tribe',
          count: { $sum: 1 }
        }
      }
    ]);

    dishCounts.forEach(item => {
      console.log(`   ${item._id}: ${item.count} dishes`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase(); 