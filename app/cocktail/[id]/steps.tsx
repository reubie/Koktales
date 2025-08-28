import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function CocktailStepsScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    {
      step: 1,
      title: 'Step 1/3',
      ingredients: ['Kumquats', 'Lime'],
      instruction: 'Shake the kumquats and lime. Watch the video to learn how to shake.',
      videoImage: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg',
      videoDescription: 'Hands holding a cocktail shaker being shaken'
    },
    {
      step: 2,
      title: 'Step 2/3',
      ingredients: ['cachaça', 'falernum', 'clover honey syrup'],
      instruction: 'Add the cachaça, falernum and clover honey syrup with ice and shake lightly until chilled.',
      videoImage: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
      videoDescription: 'Flat lay of cocktail ingredients including limes, ice, and cachaça bottle'
    },
    {
      step: 3,
      title: 'Step 3/3',
      ingredients: [],
      instruction: 'Pour (unstrained) into a double Old Fashioned glass.',
      videoImage: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg',
      videoDescription: 'Finished cocktail in a double Old Fashioned glass with muddled fruit and ice'
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressDots = () => {
    const dots = [];
    for (let i = 1; i <= totalSteps; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.progressDot,
            i === currentStep && styles.activeProgressDot
          ]}
        />
      );
    }
    return dots;
  };

  const renderIngredients = () => {
    if (currentStepData.ingredients.length === 0) return null;
    
    return (
      <View style={styles.ingredientsSection}>
        <View style={styles.ingredientsHeader}>
          <View style={styles.ingredientsIcon} />
          <Text style={styles.ingredientsText}>
            {currentStepData.ingredients.join(' ')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.stepTitle}>{currentStepData.title}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ingredients */}
        {renderIngredients()}

        {/* Instruction */}
        <View style={styles.instructionCard}>
          <Text style={styles.instructionText}>{currentStepData.instruction}</Text>
        </View>

        {/* Video/Image */}
        <View style={styles.videoContainer}>
          <Image source={{ uri: currentStepData.videoImage }} style={styles.videoImage} />
          <TouchableOpacity style={styles.playButton}>
            <Play size={32} color={Colors.typography.primary} fill={Colors.typography.primary} />
          </TouchableOpacity>
        </View>

        {/* Progress Dots */}
        <View style={styles.progressContainer}>
          {renderProgressDots()}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.navButton} onPress={goToPreviousStep}>
            <ChevronLeft size={24} color={Colors.typography.primary} />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        {currentStep < totalSteps ? (
          <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
            <Text style={styles.nextButtonText}>Next</Text>
            <ChevronRight size={24} color={Colors.typography.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.completeButton} onPress={() => router.back()}>
            <Text style={styles.completeButtonText}>Well done!</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.double,
    paddingTop: Layout.spacing.double,
    paddingBottom: Layout.spacing.md,
  },
  stepTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    color: Colors.typography.primary,
  },
  closeButton: {
    padding: Layout.spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  ingredientsSection: {
    marginBottom: Layout.spacing.double,
  },
  ingredientsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientsIcon: {
    width: 16,
    height: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginRight: Layout.spacing.sm,
  },
  ingredientsText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
  },
  instructionCard: {
    backgroundColor: Colors.surface,
    padding: Layout.spacing.double,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.double,
  },
  instructionText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.primary,
    lineHeight: 24,
  },
  videoContainer: {
    position: 'relative',
    marginBottom: Layout.spacing.double,
  },
  videoImage: {
    width: '100%',
    height: 250,
    borderRadius: Layout.borderRadius.lg,
    resizeMode: 'cover',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.double,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.typography.secondary,
  },
  activeProgressDot: {
    backgroundColor: Colors.typography.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.double,
    paddingBottom: Layout.spacing.double,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
  },
  navButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
    marginLeft: Layout.spacing.xs,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.double,
    borderRadius: Layout.borderRadius.md,
  },
  nextButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: Colors.typography.primary,
    marginRight: Layout.spacing.xs,
  },
  completeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.double,
    borderRadius: Layout.borderRadius.md,
  },
  completeButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: Colors.typography.primary,
  },
});
