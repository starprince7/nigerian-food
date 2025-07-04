# 🇳🇬 Nigerian Food Daily

A modern, user-friendly website that provides daily food suggestions for authentic Nigerian dishes. Celebrate Nigeria's rich culinary diversity by exploring dishes organized by meal type and tribal/regional origins.

## ✨ Features

- **Daily Meal Suggestions**: Get breakfast, lunch, and dinner recommendations that change daily
- **Tribal/Regional Filtering**: Explore dishes from 8 Nigerian tribes and regions
- **Authentic Recipes**: Step-by-step instructions with ingredients and cultural context
- **Beautiful UI**: Modern, responsive design with Nigerian cultural elements
- **Fast Performance**: Built with Next.js 14 and optimized for speed
- **Database Integration**: MongoDB with Mongoose for scalable data management

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v4 (ready for Google OAuth)
- **State Management**: React hooks (useState, useEffect)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository
\`\`\`bash
git clone <your-repository-url>
cd nigerian-food-daily
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
Create a \`.env.local\` file in the root directory:

\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/nigerian-food-db
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nigerian-food-db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production

# Optional: Google OAuth (for future implementation)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
\`\`\`

### 4. Database Setup
Start your MongoDB service (if running locally):

**For macOS (with Homebrew):**
\`\`\`bash
brew services start mongodb-community
\`\`\`

**For Windows:**
\`\`\`bash
net start MongoDB
\`\`\`

**For Linux:**
\`\`\`bash
sudo systemctl start mongod
\`\`\`

### 5. Seed the Database
Populate your database with sample Nigerian dishes:

\`\`\`bash
npm run seed
\`\`\`

This will create sample dishes from various Nigerian tribes including:
- Yoruba (Southwest)
- Igbo (Southeast) 
- Hausa (North)
- Cross-cultural dishes

### 6. Start the Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your Nigerian Food Daily website!

## 📁 Project Structure

\`\`\`
nigerian-food-daily/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth configuration
│   │   └── dishes/               # Dish-related APIs
│   ├── page.js                   # Homepage
│   ├── layout.js                 # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── meals/                    # Meal-specific components
│   ├── filters/                  # Filter components
│   └── layout/                   # Layout components
├── lib/                          # Utility libraries
│   ├── mongodb.js                # Database connection
│   └── sampleDishes.js           # Sample data
├── models/                       # Mongoose models
│   ├── User.js                   # User model
│   ├── Dish.js                   # Dish model
│   └── DailySuggestion.js        # Daily suggestion model
├── utils/                        # Utility functions
│   ├── constants.js              # App constants
│   ├── dishUtils.js              # Dish-related utilities
│   └── dateUtils.js              # Date utilities
├── scripts/                      # Utility scripts
│   └── seedDatabase.js           # Database seeding
└── public/                       # Static assets
    └── images/                   # Dish images
\`\`\`

## 🍽️ Nigerian Tribes & Regions Covered

The application celebrates cuisine from across Nigeria:

| Tribe | Region | Sample Dishes |
|-------|--------|---------------|
| **Yoruba** | Southwest | Amala & Ewedu, Akara, Dodo |
| **Igbo** | Southeast | Ofe Nsala, Ukwa, Nkwobi |
| **Hausa** | North | Tuwo Shinkafa, Miyan Kuka |
| **Fulani** | North | Fura da Nono, Kilishi |
| **Efik** | South-South | Afang Soup, Edikang Ikong |
| **Tiv** | Middle Belt | Ruam Kusha |
| **Edo** | South-South | Banga Soup |
| **Cross-cultural** | All Regions | Jollof Rice, Fried Rice |

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run seed\` - Seed database with sample dishes

## 🌟 Key Features Explained

### Daily Suggestions Algorithm
- Uses deterministic randomization based on current date
- Ensures variety across tribes and meal types
- Consistent suggestions throughout the day
- Automatic refresh at midnight

### Component Architecture
- **DRY Principles**: Reusable components with single responsibilities
- **MealCard**: Displays individual dish information
- **TribalFilter**: Filters dishes by Nigerian tribes
- **DailyMealSuggestions**: Main component for daily recommendations

### Database Schema
- **Dishes**: Complete recipe information with tribal classification
- **Users**: User preferences and favorites (ready for authentication)
- **Daily Suggestions**: Cached daily recommendations

## 🔮 Roadmap & Future Enhancements

### Phase 2 Features
- [ ] User authentication with Google OAuth
- [ ] Personal favorites and meal planning
- [ ] Recipe ratings and reviews
- [ ] Shopping list generation
- [ ] Nutritional tracking
- [ ] Video cooking tutorials
- [ ] Multi-language support (English, Yoruba, Igbo, Hausa)

### Phase 3 Features
- [ ] Mobile app (React Native)
- [ ] Social features and recipe sharing
- [ ] AI-powered recipe recommendations
- [ ] Integration with grocery delivery services
- [ ] Restaurant partnerships

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

### Adding New Dishes
To add new Nigerian dishes:
1. Update \`lib/sampleDishes.js\` with new dish data
2. Ensure proper tribal classification and cultural notes
3. Add dish images to \`public/images/dishes/\`
4. Run \`npm run seed\` to update the database

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🔒 Environment Security

- Never commit \`.env.local\` to version control
- Use strong, unique values for \`NEXTAUTH_SECRET\`
- Regularly rotate API keys and secrets
- Use environment-specific configurations

## 📊 Performance Features

- Image optimization with Next.js Image component
- Lazy loading for better performance
- Code splitting for faster page loads
- MongoDB indexing for efficient queries
- Caching strategies for daily suggestions

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Ensure MongoDB is running
- Check your \`MONGODB_URI\` in \`.env.local\`
- Verify network connectivity for MongoDB Atlas

**Build Errors:**
- Clear \`.next\` folder: \`rm -rf .next\`
- Reinstall dependencies: \`rm -rf node_modules && npm install\`
- Check for TypeScript files and convert to JavaScript

**Seeding Issues:**
- Ensure database connection is working
- Check console for specific error messages
- Verify sample dish data format

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check existing issues for solutions
- Review the documentation thoroughly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Nigerian culinary traditions and cultural heritage
- All tribal communities for sharing their recipes
- Open source community for tools and libraries
- Next.js team for the amazing framework

---

**Built with ❤️ for Nigerian food lovers around the world!** 🇳🇬
