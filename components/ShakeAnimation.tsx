import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Coffee } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

type ShakeAnimationProps = {
  duration: number;
  onComplete: () => void;
  isVisible: boolean;
};

export default function ShakeAnimation({ duration, onComplete, isVisible }: ShakeAnimationProps) {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [timeLeft, setTimeLeft] = React.useState(duration);

  useEffect(() => {
    if (isVisible) {
      // Start shake animation
      const shakeSequence = Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -1,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      );

      // Start progress animation
      const progressSequence = Animated.timing(progressAnimation, {
        toValue: 1,
        duration: duration * 1000,
        useNativeDriver: false,
      });

      shakeSequence.start();
      progressSequence.start();

      // Timer for countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            shakeSequence.stop();
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        shakeSequence.stop();
      };
    }
  }, [isVisible, duration]);

  if (!isVisible) return null;

  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  const progressInterpolate = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Shaking your cocktail...</Text>
        <Text style={styles.subtitle}>Keep shaking for {timeLeft} seconds</Text>
        
        <Animated.View
          style={[
            styles.shakerContainer,
            {
              transform: [{ rotate: shakeInterpolate }],
            },
          ]}
        >
          <Coffee size={80} color={Colors.primary[600]} />
        </Animated.View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressInterpolate,
                },
              ]}
            />
          </View>
        </View>

        <Text style={styles.tip}>💡 Tip: Shake until the shaker feels cold to the touch</Text>
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
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  shakerContainer: {
    marginBottom: Layout.spacing.xl,
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.full,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  progressContainer: {
    width: '100%',
    marginBottom: Layout.spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: Layout.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[600],
    borderRadius: Layout.borderRadius.full,
  },
  tip: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 