import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useShoppingList } from '@/context/ShoppingListContext';
import { ArrowLeft, Heart, Bookmark, Star, Clock, ChefHat, Wine, Eye, Share } from 'lucide-react-native';

export default function CocktailDetailScreen() {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instruments' | 'steps'>('ingredients');
  const [servings, setServings] = useState(1);
  const { addToShoppingList } = useShoppingList();

  const cocktail = {
    id: '1',
    name: 'Honey Kumquat Caipirinha',
    image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg',
    tags: ['Frutti', 'Mint', 'Bitter'],
    author: 'INSHAKER team',
    date: '12 August 2022',
    description: "The classic Caipirinha is Brazil's national cocktail. Composed of just three ingredients—cachaça (Brazil's national spirit), fresh limes and sugar, it's a cultural institution throughout the South American country and one of its most popular exports.",
    difficulty: 'easy',
    time: '3 min',
    volume: '150 ml',
    rating: 4.2,
    views: 346,
    likes: 34,
    shares: 20,
    publishedDate: '08/12/22',
    ingredients: [
      { name: 'Lemons', quantity: '40 gr', image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg' },
      { name: 'Barrister Dry Gin', quantity: '20 ml', image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg' },
      { name: 'Martini Bitter', quantity: '20 ml', image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg' },
      { name: 'Belsazar', quantity: '10 ml', image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg' },
      { name: 'Ice', quantity: 'to taste', image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg' }
    ],
    instruments: [
      { name: 'Shaker', image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg' },
      { name: 'Old-fashioned glass', image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg' }
    ],
    steps: [
      { step: 1, title: 'Shake the kumquats and lime', ingredients: ['Kumquats', 'Lime'], instruction: 'Shake the kumquats and lime. Watch the video to learn how to shake.' },
      { step: 2, title: 'Add spirits and shake', ingredients: ['cachaça', 'falernum', 'clover honey syrup'], instruction: 'Add the cachaça, falernum and clover honey syrup with ice and shake lightly until chilled.' },
      { step: 3, title: 'Pour and serve', ingredients: [], instruction: 'Pour (unstrained) into a double Old Fashioned glass.' }
    ]
  };

  const handleShakeButton = () => {
    router.push(`/cocktail/${cocktail.id}/steps`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          color={i <= rating ? Colors.primary : Colors.typography.secondary} 
          fill={i <= rating ? Colors.primary : 'transparent'} 
        />
      );
    }
    return stars;
  };

  const renderIngredients = () => (
    <View style={styles.tabContent}>
      <View style={styles.servingsRow}>
        <View style={styles.servingsControl}>
          <TouchableOpacity onPress={() => setServings(Math.max(1, servings - 1))}>
            <Text style={styles.servingsButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.servingsNumber}>{servings}</Text>
          <TouchableOpacity onPress={() => setServings(servings + 1)}>
            <Text style={styles.servingsButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.servingsText}>servings</Text>
        <TouchableOpacity 
          style={styles.addShopListButton}
          onPress={() => addToShoppingList(cocktail, servings)}
        >
          <Text style={styles.addShopListText}>Add shop list</Text>
        </TouchableOpacity>
      </View>
      
      {cocktail.ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <Image source={{ uri: ingredient.image }} style={styles.ingredientImage} />
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          <Text style={styles.ingredientQuantity}>
            {ingredient.quantity === 'to taste' ? ingredient.quantity : `${parseFloat(ingredient.quantity) * servings}${ingredient.quantity.includes('ml') ? ' ml' : ' gr'}`
          }</Text>
        </View>
      ))}
    </View>
  );

  const renderInstruments = () => (
    <View style={styles.tabContent}>
      <View style={styles.servingsRow}>
        <View style={styles.servingsControl}>
          <TouchableOpacity onPress={() => setServings(Math.max(1, servings - 1))}>
            <Text style={styles.servingsButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.servingsNumber}>{servings}</Text>
          <TouchableOpacity onPress={() => setServings(servings + 1)}>
            <Text style={styles.servingsButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.servingsText}>servings</Text>
        <TouchableOpacity 
          style={styles.addShopListButton}
          onPress={() => addToShoppingList(cocktail, servings)}
        >
          <Text style={styles.addShopListText}>Add shop list</Text>
        </TouchableOpacity>
      </View>
      
      {cocktail.instruments.map((instrument, index) => (
        <View key={index} style={styles.instrumentItem}>
          <Image source={{ uri: instrument.image }} style={styles.instrumentImage} />
          <Text style={styles.instrumentName}>{instrument.name}</Text>
        </View>
      ))}
    </View>
  );

  const renderSteps = () => (
    <View style={styles.tabContent}>
      <View style={styles.servingsRow}>
        <View style={styles.servingsControl}>
          <TouchableOpacity onPress={() => setServings(Math.max(1, servings - 1))}>
            <Text style={styles.servingsButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.servingsNumber}>{servings}</Text>
          <TouchableOpacity onPress={() => setServings(servings + 1)}>
            <Text style={styles.servingsButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.servingsText}>servings</Text>
        <TouchableOpacity 
          style={styles.addShopListButton}
          onPress={() => addToShoppingList(cocktail, servings)}
        >
          <Text style={styles.addShopListText}>Add shop list</Text>
        </TouchableOpacity>
      </View>
      
      {cocktail.steps.map((step, index) => (
        <View key={index} style={styles.stepItem}>
          <View style={styles.stepBullet} />
          <Text style={styles.stepText}>{step.instruction}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bookmark size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cocktail Image */}
        <Image source={{ uri: cocktail.image }} style={styles.cocktailImage} />
        
        {/* Recipe Info */}
        <View style={styles.recipeInfo}>
          {/* Tags */}
          <View style={styles.tags}>
            {cocktail.tags.map((tag, index) => (
              <React.Fragment key={tag}>
                <Text style={styles.tag}>{tag}</Text>
                {index < cocktail.tags.length - 1 && <Text style={styles.tagDot}>•</Text>}
              </React.Fragment>
            ))}
          </View>

          {/* Title */}
          <Text style={styles.title}>{cocktail.name}</Text>

          {/* Author and Date */}
          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitial}>I</Text>
            </View>
            <Text style={styles.authorText}>{cocktail.author}</Text>
            <Text style={styles.dateText}>{cocktail.date}</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{cocktail.description}</Text>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <ChefHat size={16} color={Colors.primary} />
              <Text style={styles.infoText}>{cocktail.difficulty} No need any special skills</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color={Colors.primary} />
              <Text style={styles.infoText}>{cocktail.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Wine size={16} color={Colors.primary} />
              <Text style={styles.infoText}>{cocktail.volume} in 1 serving</Text>
            </View>
          </View>

          {/* Engagement Metrics */}
          <View style={styles.engagementRow}>
            <View style={styles.metrics}>
              <View style={styles.metricItem}>
                <Eye size={14} color={Colors.typography.secondary} />
                <Text style={styles.metricText}>{cocktail.views} views</Text>
              </View>
              <View style={styles.metricItem}>
                <Heart size={14} color={Colors.primary} />
                <Text style={styles.metricText}>{cocktail.likes}</Text>
              </View>
              <View style={styles.metricItem}>
                <Share size={14} color={Colors.primary} />
                <Text style={styles.metricText}>{cocktail.shares}</Text>
              </View>
            </View>
            <Text style={styles.publishedDate}>Published {cocktail.publishedDate}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingNumber}>{cocktail.rating}</Text>
            <View style={styles.starsContainer}>
              {renderStars(cocktail.rating)}
            </View>
            <TouchableOpacity style={styles.reviewsButton}>
              <Text style={styles.reviewsText}>Reviews</Text>
              <Text style={styles.reviewsArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'instruments' && styles.activeTab]}
              onPress={() => setActiveTab('instruments')}
            >
              <Text style={[styles.tabText, activeTab === 'instruments' && styles.activeTabText]}>
                Instruments
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'steps' && styles.activeTab]}
              onPress={() => setActiveTab('steps')}
            >
              <Text style={[styles.tabText, activeTab === 'steps' && styles.activeTabText]}>
                Step by step
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'ingredients' && renderIngredients()}
          {activeTab === 'instruments' && renderInstruments()}
          {activeTab === 'steps' && renderSteps()}
        </View>
      </ScrollView>

      {/* Shake Button */}
      <TouchableOpacity style={styles.shakeButton} onPress={handleShakeButton}>
        <Text style={styles.shakeButtonText}>Start shaking!</Text>
      </TouchableOpacity>
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
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  cocktailImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: Layout.spacing.double,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  tag: {
    color: Colors.typography.secondary,
    fontSize: 14,
  },
  tagDot: {
    color: Colors.primary,
    marginHorizontal: Layout.spacing.xs,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.sm,
  },
  authorInitial: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: Colors.primary,
  },
  authorText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.typography.primary,
    marginRight: Layout.spacing.sm,
  },
  dateText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.typography.secondary,
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.primary,
    lineHeight: 24,
    marginBottom: Layout.spacing.double,
  },
  quickInfo: {
    marginBottom: Layout.spacing.double,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  infoText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.typography.primary,
    marginLeft: Layout.spacing.sm,
  },
  engagementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.double,
  },
  metrics: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  metricText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: Colors.typography.secondary,
  },
  publishedDate: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: Colors.typography.secondary,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.double,
  },
  ratingNumber: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    color: Colors.typography.primary,
    marginRight: Layout.spacing.md,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: Layout.spacing.xs,
    marginRight: Layout.spacing.double,
  },
  reviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
  },
  reviewsArrow: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: Colors.typography.primary,
    marginLeft: Layout.spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.double,
  },
  tab: {
    marginRight: Layout.spacing.double,
    paddingBottom: Layout.spacing.sm,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.secondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  tabContent: {
    marginBottom: Layout.spacing.double,
  },
  servingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.double,
  },
  servingsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    marginRight: Layout.spacing.md,
  },
  servingsButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.primary,
    paddingHorizontal: Layout.spacing.sm,
  },
  servingsNumber: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.primary,
    marginHorizontal: Layout.spacing.md,
  },
  servingsText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.primary,
    marginRight: Layout.spacing.double,
  },
  addShopListButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
  },
  addShopListText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.md,
  },
  ingredientName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
    flex: 1,
  },
  ingredientQuantity: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.typography.secondary,
  },
  instrumentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  instrumentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.md,
  },
  instrumentName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.md,
  },
  stepBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Layout.spacing.md,
    marginTop: 6,
  },
  stepText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.primary,
    lineHeight: 24,
    flex: 1,
  },
  shakeButton: {
    backgroundColor: Colors.primary,
    margin: Layout.spacing.double,
    paddingVertical: Layout.spacing.double,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
  },
  shakeButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.typography.primary,
  },
});