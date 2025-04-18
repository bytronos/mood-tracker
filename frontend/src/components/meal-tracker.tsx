import React, { useState } from 'react';
import { Meal } from '../types';
import { Button } from './ui/button';

interface MealTrackerProps {
  meals: Meal[];
  onChange: (meals: Meal[]) => void;
}

export function MealTracker({ meals, onChange }: MealTrackerProps) {
  const [newMealName, setNewMealName] = useState('');
  const [newMealCategory, setNewMealCategory] = useState<Meal['category']>('snack');
  const [newMealRating, setNewMealRating] = useState<Meal['rating']>(3);

  const addMeal = () => {
    if (newMealName.trim() === '') return;
    
    const newMeal: Meal = {
      name: newMealName,
      category: newMealCategory,
      time: Date.now(),
      rating: newMealRating
    };
    
    onChange([...meals, newMeal]);
    setNewMealName('');
  };

  const removeMeal = (index: number) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    onChange(updatedMeals);
  };

  const getCategoryColor = (category: Meal['category']) => {
    switch(category) {
      case 'breakfast': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'lunch': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'dinner': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'snack': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    }
  };

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Meals</h2>
      
      <div className="space-y-3 mb-5">
        {meals.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-2">
            No meals recorded today. Add your first one!
          </p>
        )}
        
        {meals.map((meal, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="font-medium text-gray-900 dark:text-white">{meal.name}</p>
                <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(meal.category)}`}>
                  {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
                </span>
              </div>
              {meal.rating && (
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-sm ${star <= meal.rating! ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}>
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => removeMeal(index)}
              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1 ml-2 flex-shrink-0"
              aria-label="Remove meal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <input
          type="text"
          value={newMealName}
          onChange={(e) => setNewMealName(e.target.value)}
          placeholder="What did you eat?"
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={newMealCategory}
              onChange={(e) => setNewMealCategory(e.target.value as Meal['category'])}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Rating:</span>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setNewMealRating(rating as Meal['rating'])}
                  className={`text-xl ${rating <= newMealRating! ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                  aria-label={`Rate ${rating} out of 5`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={addMeal} 
            variant="primary"
            className="sm:ml-auto"
          >
            Add Meal
          </Button>
        </div>
      </div>
    </div>
  );
}