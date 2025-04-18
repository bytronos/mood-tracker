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

  return (
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">Meals</h2>
      
      <div className="space-y-2 mb-4">
        {meals.map((meal, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{meal.name}</p>
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                  {meal.category}
                </span>
              </div>
              {meal.rating && (
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xs">
                      {star <= meal.rating! ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => removeMeal(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={newMealName}
          onChange={(e) => setNewMealName(e.target.value)}
          placeholder="What did you eat?"
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        
        <div className="flex gap-2">
          <select
            value={newMealCategory}
            onChange={(e) => setNewMealCategory(e.target.value as Meal['category'])}
            className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Rating:</span>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setNewMealRating(rating as Meal['rating'])}
                className={`text-lg ${rating <= newMealRating! ? "text-yellow-500" : "text-muted-foreground"}`}
              >
                ★
              </button>
            ))}
          </div>
          
          <Button onClick={addMeal} className="ml-auto">
            Add Meal
          </Button>
        </div>
      </div>
    </div>
  );
}