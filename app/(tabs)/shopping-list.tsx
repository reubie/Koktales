import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, ChevronRight, Play } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { cocktails, Cocktail } from '@/constants/Cocktails';
import Header from '@/components/Header';

export default function ShoppingListScreen() {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  const freeCocktails = cocktails.filter(cocktail => cocktail.type === 'free');
  const premiumCocktails = cocktails.filter(cocktail => cocktail.type === 'premium');

  const handleStartMaking = (cocktail: Cocktail) => {
    router.push(`/cocktail/${cocktail.id}`);
  };

  const renderCocktailCard = (cocktail: Cocktail) => (
    <View key={cocktail.id} style={styles.cocktailCard}>
      <TouchableOpacity
        style={styles.cocktailHeader}
        onPress={() => setSelectedCocktail(selectedCocktail?.id === cocktail.id ? null : cocktail)}
      >
        <Image source={{ uri: cocktail.image }} style={styles.cocktailImage} />
        <View style={styles.cocktailInfo}>
          <View style={styles.cocktailHeaderRow}>
            <Text style={styles.cocktailName}>{cocktail.name}</Text>
            {cocktail.type === 'premium' && (
              <View style={styles.premiumBadge}>
                <Lock size={12} color={Colors.white} />
                <Text style={styles.premiumText}>${cocktail.price}</Text>
              </View>
            )}
          </View>
          <Text style={styles.cocktailDescription}>{cocktail.description}</Text>
          <View style={styles.cocktailMeta}>
            <Text style={styles.cocktailMetaText}>{cocktail.preparationTime}</Text>
            <Text style={[styles.cocktailMetaText, styles.dot]}>•</Text>
            <Text style={styles.cocktailMetaText}>{cocktail.difficulty}</Text>
            <ChevronRight 
              size={16} 
              color={Colors.gray[400]}
              style={[
                styles.chevron,
                selectedCocktail?.id === cocktail.id && styles.chevronRotated
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>

      {selectedCocktail?.id === cocktail.id && (
        <View style={styles.expandedContent}>
          <View style={styles.ingredientsList}>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {cocktail.ingredients.map(ingredient => (
              <View key={ingredient.id} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientAmount}>
                  {ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => handleStartMaking(cocktail)}
          >
            <Play size={18} color={Colors.white} />
            <Text style={styles.startButtonText}>Start Making Cocktail</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Shopping List" />
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Free Cocktails</Text>
        {freeCocktails.map(renderCocktailCard)}

        <Text style={styles.sectionTitle}>Premium Cocktails</Text>
        {premiumCocktails.map(renderCocktailCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  sectionTitle: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.lg,
  },
  cocktailCard: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cocktailHeader: {
    flexDirection: 'row',
  },
  cocktailImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  cocktailInfo: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  cocktailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  cocktailName: {
    ...Fonts.heading,
    fontSize: 18,
    color: Colors.gray[800],
    flex: 1,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  premiumText: {
    ...Fonts.caption,
    color: Colors.white,
    marginLeft: 4,
    fontSize: 12,
  },
  cocktailDescription: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.md,
    fontSize: 14,
  },
  cocktailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cocktailMetaText: {
    ...Fonts.caption,
    color: Colors.gray[500],
    fontSize: 14,
    textTransform: 'capitalize',
  },
  dot: {
    marginHorizontal: Layout.spacing.xs,
  },
  chevron: {
    marginLeft: 'auto',
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  expandedContent: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  ingredientsList: {
    marginBottom: Layout.spacing.lg,
  },
  ingredientsTitle: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.sm,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.xs,
  },
  ingredientName: {
    ...Fonts.body,
    color: Colors.gray[700],
  },
  ingredientAmount: {
    ...Fonts.body,
    color: Colors.gray[500],
  },
  startButton: {
    backgroundColor: Colors.primary[600],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  startButtonText: {
    ...Fonts.subheading,
    color: Colors.white,
    fontSize: 16,
    marginLeft: Layout.spacing.sm,
  },
});