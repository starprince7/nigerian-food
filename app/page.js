'use client';

import DailyMealSuggestions from '@/components/meals/DailyMealSuggestions';
import TribalFilter from '@/components/filters/TribalFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              🇳🇬 Nigerian Food Daily
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover authentic Nigerian dishes from all tribes and regions. 
              Get personalized daily meal suggestions celebrating our rich culinary heritage.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                8 Nigerian Tribes
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Daily Suggestions
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Authentic Recipes
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Cultural Stories
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
        {/* Daily Suggestions */}
        <div className="w-full flex justify-center mb-16">
          <DailyMealSuggestions />
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Suggestions</h3>
            <p className="text-gray-600">
              Get fresh meal recommendations every day, featuring breakfast, lunch, and dinner from different Nigerian tribes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Heritage</h3>
            <p className="text-gray-600">
              Learn about the rich history and cultural significance of each dish from across Nigeria&apos;s diverse regions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentic Recipes</h3>
            <p className="text-gray-600">
              Step-by-step instructions, ingredient lists, and cooking tips to help you create authentic Nigerian meals.
            </p>
          </div>
        </div>

        {/* Tribal Showcase */}
        <div className="mt-20 bg-white rounded-xl shadow-sm p-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Explore Dishes by Nigerian Tribes
          </h2>
          <TribalFilter 
            selectedTribe="All Tribes"
            layout="horizontal"
            className="justify-center"
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full">
            <div className="p-4">
              <div className="text-2xl mb-2">🌯</div>
              <h4 className="font-semibold text-gray-900">Yoruba</h4>
              <p className="text-sm text-gray-600">Southwest Nigeria</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🍲</div>
              <h4 className="font-semibold text-gray-900">Igbo</h4>
              <p className="text-sm text-gray-600">Southeast Nigeria</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🥘</div>
              <h4 className="font-semibold text-gray-900">Hausa</h4>
              <p className="text-sm text-gray-600">Northern Nigeria</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🐟</div>
              <h4 className="font-semibold text-gray-900">Efik</h4>
              <p className="text-sm text-gray-600">South-South Nigeria</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center w-full flex justify-center">
          <div className="relative overflow-hidden rounded-3xl p-20 sm:p-24 lg:p-32 max-w-3xl w-full flex flex-col items-center shadow-2xl bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white">
            {/* Decorative circles */}
            <div className="absolute -top-16 -left-16 h-40 w-40 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 h-52 w-52 bg-white bg-opacity-10 rounded-full"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-5xl mb-6">🥘</span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Start Your Nigerian Food Journey Today
              </h2>
              <p className="text-green-100 mb-10 max-w-2xl mx-auto text-lg md:text-xl">
                Join thousands of food lovers discovering authentic Nigerian recipes. 
                Get personalized recommendations based on your taste and dietary needs.
              </p>
              <button className="btn-nigeria shadow-xl px-10 py-4 text-lg md:text-xl rounded-full hover:scale-105 transform transition-transform duration-200">
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 