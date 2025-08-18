import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SubscriptionStatus = 'none' | 'subscribed';

interface SubscriptionContextType {
  isSubscribed: boolean;
  unlockedCocktails: string[];
  unlockCocktail: (cocktailId: string) => Promise<void>;
  setSubscriptionStatus: (status: SubscriptionStatus) => Promise<void>;
  checkAccess: (cocktailId: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [unlockedCocktails, setUnlockedCocktails] = useState<string[]>([]);

  // Load saved state on mount
  useEffect(() => {
    loadSavedState();
  }, []);

  const loadSavedState = async () => {
    try {
      const [subscriptionStatus, unlockedIds] = await Promise.all([
        AsyncStorage.getItem('subscriptionStatus'),
        AsyncStorage.getItem('unlockedCocktails'),
      ]);

      setIsSubscribed(subscriptionStatus === 'subscribed');
      setUnlockedCocktails(unlockedIds ? JSON.parse(unlockedIds) : []);
    } catch (error) {
      console.error('Error loading subscription state:', error);
    }
  };

  const unlockCocktail = async (cocktailId: string) => {
    try {
      const newUnlockedCocktails = [...unlockedCocktails, cocktailId];
      await AsyncStorage.setItem('unlockedCocktails', JSON.stringify(newUnlockedCocktails));
      setUnlockedCocktails(newUnlockedCocktails);
    } catch (error) {
      console.error('Error unlocking cocktail:', error);
    }
  };

  const setSubscriptionStatus = async (status: SubscriptionStatus) => {
    try {
      await AsyncStorage.setItem('subscriptionStatus', status);
      setIsSubscribed(status === 'subscribed');
    } catch (error) {
      console.error('Error setting subscription status:', error);
    }
  };

  const checkAccess = (cocktailId: string) => {
    return isSubscribed || unlockedCocktails.includes(cocktailId);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        unlockedCocktails,
        unlockCocktail,
        setSubscriptionStatus,
        checkAccess,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
} 