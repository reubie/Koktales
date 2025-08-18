import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Wine } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

type PourAnimationProps = {
  onComplete: () => void;
  isVisible: boolean;
  cocktailColor?: string;
};

export default function PourAnimation({ onComplete, isVisible, cocktailColor = Colors.primary[600] }: PourAnimationProps) {
  const pourAnimation = useRef(new Animated.Value(0)).current;
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const glassOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Animate glass appearance
      Animated.timing(glassOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Start pour animation after glass appears
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(pourAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fillAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setTimeout(onComplete, 1000);
        });
      }, 500);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const pourInterpolate = pourAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fillInterpolate = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pouring your cocktail...</Text>
        
        <View style={styles.animationContainer}>
          {/* Pouring stream */}
          <Animated.View
            style={[
              styles.pourStream,
              {
                opacity: pourInterpolate,
                transform: [{ scaleY: pourInterpolate }],
              },
            ]}
          />

          {/* Glass */}
          <Animated.View
            style={[
              styles.glass,
              {
                opacity: glassOpacity,
              },
            ]}
          >
            <Wine size={60} color={Colors.gray[400]} />
            
            {/* Liquid filling the glass */}
            <Animated.View
              style={[
                styles.liquid,
                {
                  backgroundColor: cocktailColor,
                  height: fillInterpolate,
                },
              ]}
            />
          </Animated.View>
        </View>

        <Text style={styles.subtitle}>Your cocktail is ready!</Text>
        <Text style={styles.tip}>🍸 Enjoy your perfectly crafted drink</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  animationContainer: {
    position: 'relative',
    marginBottom: Layout.spacing.xl,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pourStream: {
    position: 'absolute',
    top: 20,
    width: 4,
    height: 80,
    backgroundColor: Colors.primary[600],
    borderRadius: 2,
    zIndex: 1,
  },
  glass: {
    position: 'relative',
    marginTop: 60,
  },
  liquid: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    right: 12,
    borderRadius: 20,
    zIndex: -1,
  },
  subtitle: {
    ...Fonts.subheading,
    fontSize: 18,
    color: Colors.gray[700],
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  tip: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 