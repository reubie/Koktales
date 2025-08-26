import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate to age verification after timeout
    const timer = setTimeout(() => {
      router.replace('/auth/verify-age');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
                  <Text style={styles.logoText}>KokTales</Text>
        <Text style={styles.tagline}>Your Personal Bartender</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 14, 14, 0.7)',
  },
  logoText: {
    ...Fonts.headline,
    fontSize: 42,
    color: Colors.typography.primary,
    letterSpacing: 2,
    marginBottom: Layout.spacing.md,
  },
  tagline: {
    ...Fonts.body1,
    fontSize: 18,
    color: Colors.typography.primary,
    opacity: 0.9,
  },
});