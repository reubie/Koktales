import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ShoppingListIngredient {
  name: string;
  quantity: string;
  unit: string;
  completed: boolean;
  icon?: string;
}

export interface ShoppingListItem {
  id: string;
  cocktailId: string;
  cocktailName: string;
  servings: number;
  ingredients: ShoppingListIngredient[];
  addedAt: Date;
}

interface ShoppingListContextType {
  shoppingList: ShoppingListItem[];
  addToShoppingList: (cocktail: any, servings: number) => void;
  removeFromShoppingList: (id: string) => void;
  toggleIngredient: (cocktailId: string, ingredientName: string) => void;
  clearCompleted: () => void;
  getTotalItems: () => number;
  getCompletedItems: () => number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

export const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  // Load shopping list from storage on app start
  useEffect(() => {
    loadShoppingList();
  }, []);

  // Save shopping list to storage whenever it changes
  useEffect(() => {
    saveShoppingList();
  }, [shoppingList]);

  const loadShoppingList = async () => {
    try {
      const stored = await AsyncStorage.getItem('shoppingList');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert string dates back to Date objects
        const withDates = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setShoppingList(withDates);
      }
    } catch (error) {
      console.error('Error loading shopping list:', error);
    }
  };

  const saveShoppingList = async () => {
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    } catch (error) {
      console.error('Error saving shopping list:', error);
    }
  };

  const addToShoppingList = (cocktail: any, servings: number) => {
    // Check if cocktail is already in shopping list
    const existingIndex = shoppingList.findIndex(item => item.cocktailId === cocktail.id);
    
    if (existingIndex !== -1) {
      // Update servings if already exists
      const updatedList = [...shoppingList];
      updatedList[existingIndex].servings = servings;
      setShoppingList(updatedList);
    } else {
      // Add new cocktail to shopping list
      const newItem: ShoppingListItem = {
        id: `${cocktail.id}-${Date.now()}`,
        cocktailId: cocktail.id,
        cocktailName: cocktail.name,
        servings,
        ingredients: cocktail.ingredients.map((ingredient: any) => {
          // Parse quantity and unit
          const quantityMatch = ingredient.quantity.match(/^(\d+(?:\.\d+)?)\s*(ml|gr|g|oz|cl|dash|splash|to taste)$/i);
          let unit = 'ml';
          let quantity = ingredient.quantity;
          
          if (quantityMatch) {
            const [, num, unitStr] = quantityMatch;
            unit = unitStr.toLowerCase();
            if (unit === 'gr') unit = 'g';
            quantity = num;
          }
          
          return {
            name: ingredient.name,
            quantity,
            unit,
            completed: false,
            icon: ingredient.image
          };
        }),
        addedAt: new Date()
      };
      
      setShoppingList(prev => [...prev, newItem]);
    }
  };

  const removeFromShoppingList = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const toggleIngredient = (cocktailId: string, ingredientName: string) => {
    setShoppingList(prev => prev.map(item => {
      if (item.cocktailId === cocktailId) {
        return {
          ...item,
          ingredients: item.ingredients.map(ingredient => {
            if (ingredient.name === ingredientName) {
              return { ...ingredient, completed: !ingredient.completed };
            }
            return ingredient;
          })
        };
      }
      return item;
    }));
  };

  const clearCompleted = () => {
    setShoppingList(prev => prev.map(item => ({
      ...item,
      ingredients: item.ingredients.filter(ingredient => !ingredient.completed)
    })).filter(item => item.ingredients.length > 0));
  };

  const getTotalItems = () => {
    return shoppingList.reduce((total, item) => total + item.ingredients.length, 0);
  };

  const getCompletedItems = () => {
    return shoppingList.reduce((total, item) => 
      total + item.ingredients.filter(ingredient => ingredient.completed).length, 0
    );
  };

  const value: ShoppingListContextType = {
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    toggleIngredient,
    clearCompleted,
    getTotalItems,
    getCompletedItems
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
