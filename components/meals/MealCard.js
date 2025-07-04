import Image from 'next/image';
import Link from 'next/link';
import Card from '../ui/Card';
import { TRIBE_COLORS } from '@/utils/constants';

const MealCard = ({ 
  dish,
  mealType,
  showMealType = true,
  onClick,
  className = ''
}) => {
  if (!dish) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </Card>
    );
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(dish);
    }
  };

  const cardContent = (
    <Card 
      hover={true}
      onClick={handleCardClick}
      className={`overflow-hidden items-center text-center ${className}`}
      padding="p-0"
    >
      {/* Dish Image */}
      <div className="relative h-48 w-full">
        <Image
          src={dish.image || '/images/dishes/placeholder.svg'}
          alt={dish.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {/* Meal Type Badge */}
        {showMealType && mealType && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-800 capitalize">
              {mealType}
            </span>
          </div>
        )}
        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            dish.difficulty === 'easy' 
              ? 'bg-green-100 text-green-800'
              : dish.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {dish.difficulty}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col items-center text-center space-y-2">
        {/* Dish Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {dish.name}
        </h3>

        {/* Tribal and Regional Info */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            TRIBE_COLORS[dish.tribe] || 'bg-gray-100 text-gray-800'
          }`}>
            {dish.tribe}
          </span>
          <span className="text-xs text-gray-500">
            {dish.region}
          </span>
        </div>

        {/* Cooking Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {dish.cookingTime}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {dish.servings} serving{dish.servings !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Tags */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {dish.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
            {dish.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                +{dish.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Cultural Note Preview */}
        {dish.culturalNote && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {dish.culturalNote}
          </p>
        )}
      </div>
    </Card>
  );

  // If we have a slug, wrap in Link for navigation
  if (dish.slug && !onClick) {
    return (
      <Link href={`/dishes/${dish.slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default MealCard; 