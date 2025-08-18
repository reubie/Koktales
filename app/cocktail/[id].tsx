import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { cocktails } from '@/constants/Cocktails';
import { Heart, ArrowLeft, Clock, Award, Play } from 'lucide-react-native';
import RecipeSteps from '@/components/RecipeSteps';
import ShakeAnimation from '@/components/ShakeAnimation';
import PourAnimation from '@/components/PourAnimation';

type ViewMode = 'details' | 'recipe' | 'shaking' | 'pouring';

export default function CocktailDetailScreen() {
  const { id } = useLocalSearchParams();
  const cocktail = cocktails.find((c) => c.id === id);
  const [favorite, setFavorite] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('details');

  if (!cocktail) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cocktail not found</Text>
      </SafeAreaView>
    );
  }

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleStartRecipe = () => {
    setViewMode('recipe');
  };

  const handleAllStepsComplete = () => {
    // Find the shake step to determine duration
    const shakeStep = cocktail.recipeSteps.find(step => step.action === 'shake');
    if (shakeStep && shakeStep.duration) {
      setViewMode('shaking');
    } else {
      setViewMode('pouring');
    }
  };

  const handleShakeComplete = () => {
    setViewMode('pouring');
  };

  const handlePourComplete = () => {
    setViewMode('details');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'recipe':
        return (
          <RecipeSteps
            steps={cocktail.recipeSteps}
            onAllStepsComplete={handleAllStepsComplete}
          />
        );
      case 'shaking':
        const shakeStep = cocktail.recipeSteps.find(step => step.action === 'shake');
        return (
          <ShakeAnimation
            duration={shakeStep?.duration || 10}
            onComplete={handleShakeComplete}
            isVisible={true}
          />
        );
      case 'pouring':
        return (
          <PourAnimation
            onComplete={handlePourComplete}
            isVisible={true}
            cocktailColor={Colors.primary[600]}
          />
        );
      default:
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Image source={{ uri: cocktail.image }} style={styles.headerImage} />
              <View style={styles.overlay} />
              
              <View style={styles.headerButtons}>
                <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => router.back()}
                >
                  <ArrowLeft size={24} color={Colors.white} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.favoriteButton} 
                  onPress={toggleFavorite}
                >
                  <Heart 
                    size={24} 
                    color={favorite ? Colors.secondary[500] : Colors.white} 
                    fill={favorite ? Colors.secondary[500] : 'transparent'} 
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{cocktail.name}</Text>
                <View style={styles.metaContainer}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color={Colors.white} />
                    <Text style={styles.metaText}>{cocktail.preparationTime}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Award size={16} color={Colors.white} />
                    <Text style={styles.metaText}>{cocktail.difficulty}</Text>
                  </View>
                  {cocktail.type === 'premium' && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>${cocktail.price}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            
            <View style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{cocktail.description}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {cocktail.ingredients.map((ingredient) => (
                  <View key={ingredient.id} style={styles.ingredientItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.ingredientText}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Glass</Text>
                <Text style={styles.glassText}>{cocktail.glassType}</Text>
              </View>

              <TouchableOpacity 
                style={styles.startButton}
                onPress={handleStartRecipe}
              >
                <Play size={20} color={Colors.white} />
                <Text style={styles.startButtonText}>Start Making Cocktail</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerButtons: {
    position: 'absolute',
    top: Layout.spacing.lg,
    left: Layout.spacing.lg,
    right: Layout.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: Layout.spacing.lg,
    left: Layout.spacing.lg,
    right: Layout.spacing.lg,
  },
  title: {
    ...Fonts.heading,
    fontSize: 28,
    color: Colors.white,
    marginBottom: Layout.spacing.sm,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  metaText: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.white,
    marginLeft: Layout.spacing.xs,
    textTransform: 'capitalize',
  },
  premiumBadge: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  premiumText: {
    ...Fonts.caption,
    color: Colors.white,
    fontSize: 12,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    ...Fonts.subheading,
    fontSize: 20,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.md,
  },
  description: {
    ...Fonts.body,
    color: Colors.gray[600],
    lineHeight: 24,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[600],
    marginRight: Layout.spacing.md,
  },
  ingredientText: {
    ...Fonts.body,
    color: Colors.gray[700],
  },
  glassText: {
    ...Fonts.body,
    color: Colors.gray[700],
    fontSize: 16,
  },
  startButton: {
    backgroundColor: Colors.primary[600],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.lg,
    marginTop: Layout.spacing.lg,
  },
  startButtonText: {
    ...Fonts.subheading,
    color: Colors.white,
    fontSize: 18,
    marginLeft: Layout.spacing.sm,
  },
});