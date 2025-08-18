import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="bartender/[id]" 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="followers" 
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}