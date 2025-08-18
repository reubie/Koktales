import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import Colors from '@/constants/Colors';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.gray[800],
        headerTitleStyle: {
          fontFamily: 'Montserrat-SemiBold',
        },
        headerShadowVisible: false,
        animation: Platform.OS === 'android' ? 'fade' : 'default',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: 'Account Settings',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="preferences"
        options={{
          title: 'Preferences',
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: 'Help & Support',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About App',
        }}
      />
    </Stack>
  );
} 