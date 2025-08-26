import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, Clock, Heart, Share } from 'lucide-react-native';
import { useState } from 'react';

export default function CocktailDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock cocktail data - in real app this would come from API/database
  const cocktail = {
    id: id as string,
    name: 'Classic Margarita',
    description: 'A refreshing blend of tequila, lime juice, and orange liqueur',
    image: 'https://images.pexels.com/photos/613037/pexels-photo-613037.jpeg',
    preparationTime: '5 min',
    difficulty: 'Easy',
    ingredients: [
      '2 oz tequila blanco',
      '1 oz fresh lime juice',
      '1 oz triple sec',
      'Salt for rim',
      'Lime wheel for garnish'
    ],
    instructions: [
      'Rim the glass with salt',
      'Combine tequila, lime juice, and triple sec in a shaker',
      'Add ice and shake vigorously',
      'Strain into the prepared glass',
      'Garnish with lime wheel'
    ]
  };

  const handleBack = () => {
    router.back();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Handle share functionality
    console.log('Share cocktail');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.actionButton}>
            <Heart 
              size={24} 
              color={isFavorite ? Colors.primary : Colors.typography.primary}
              fill={isFavorite ? Colors.primary : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Share size={24} color={Colors.typography.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image source={{ uri: cocktail.image }} style={styles.heroImage} />
        
        {/* Cocktail Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{cocktail.name}</Text>
          <Text style={styles.description}>{cocktail.description}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.typography.secondary} />
              <Text style={styles.metaText}>{cocktail.preparationTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaText}>Difficulty: {cocktail.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {cocktail.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.bullet} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {cocktail.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingTop: Layout.spacing.triple,
    paddingHorizontal: Layout.spacing.double,
    zIndex: 1,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
  },
  actionButton: {
    padding: Layout.spacing.sm,
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: Layout.spacing.double,
  },
  title: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.sm,
  },
  description: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
    marginBottom: Layout.spacing.double,
    lineHeight: 22,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: Layout.spacing.double,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  metaText: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 14,
  },
  section: {
    paddingHorizontal: Layout.spacing.double,
    marginBottom: Layout.spacing.quadruple,
  },
  sectionTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.md,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: Layout.spacing.md,
  },
  ingredientText: {
    ...Fonts.body1,
    color: Colors.typography.primary,
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  stepNumberText: {
    ...Fonts.body4,
    color: Colors.typography.primary,
    fontSize: 12,
  },
  instructionText: {
    ...Fonts.body1,
    color: Colors.typography.primary,
    flex: 1,
    lineHeight: 22,
  },
});