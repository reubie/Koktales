import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { SplashScreen } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { SubscriptionProvider } from '@/context/SubscriptionContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  
  const [fontsLoaded, fontError] = useFonts({
    'Roboto': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-Bold': Roboto_700Bold,
    ...FontAwesome.font,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SubscriptionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="index" 
            options={{ 
              animation: 'fade'
            }} 
          />
          <Stack.Screen 
            name="auth/verify-age" 
            options={{ 
              animation: 'fade'
            }} 
          />
          <Stack.Screen 
            name="auth/login" 
            options={{ 
              animation: Platform.OS === 'android' ? 'fade' : 'default'
            }} 
          />
          <Stack.Screen 
            name="auth/signup" 
            options={{ 
              animation: Platform.OS === 'android' ? 'fade' : 'default'
            }} 
          />
          <Stack.Screen 
            name="auth/forgot-password" 
            options={{ 
              animation: Platform.OS === 'android' ? 'fade' : 'default'
            }} 
          />
          <Stack.Screen 
            name="subscription" 
            options={{ 
              animation: Platform.OS === 'android' ? 'fade' : 'default'
            }} 
          />
          <Stack.Screen 
            name="onboarding" 
            options={{ 
              animation: 'fade'
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              animation: Platform.OS === 'android' ? 'fade' : 'default'
            }} 
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="payment/index" options={{ title: 'Payment' }} />
          <Stack.Screen 
            name="cocktail/[id]" 
            options={{ 
              title: 'Cocktail Details',
              headerBackTitle: 'Back'
            }} 
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="categories/index" />
          <Stack.Screen name="categories/[id]" />
          <Stack.Screen name="classics" />
          <Stack.Screen name="popular" />
          <Stack.Screen name="search" />
          <Stack.Screen name="articles/[id]" />
          <Stack.Screen name="search/filters" />
        </Stack>
      </ThemeProvider>
    </SubscriptionProvider>
  );
}