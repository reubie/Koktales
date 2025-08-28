import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useShoppingList } from '@/context/ShoppingListContext';
import { ChevronDown, ChevronUp, Check, Trash2 } from 'lucide-react-native';

export default function ShoppingListScreen() {
  const { shoppingList, toggleIngredient, removeFromShoppingList, getTotalItems, getCompletedItems } = useShoppingList();
  const [expandedCocktails, setExpandedCocktails] = useState<Set<string>>(new Set());

  const totalItems = getTotalItems();
  const completedItems = getCompletedItems();

  const toggleCocktailExpansion = (cocktailId: string) => {
    const newExpanded = new Set(expandedCocktails);
    if (newExpanded.has(cocktailId)) {
      newExpanded.delete(cocktailId);
    } else {
      newExpanded.add(cocktailId);
    }
    setExpandedCocktails(newExpanded);
  };

  const isExpanded = (cocktailId: string) => expandedCocktails.has(cocktailId);

  const renderIngredientIcon = (ingredient: any) => {
    if (ingredient.icon) {
      return (
        <Image source={{ uri: ingredient.icon }} style={styles.ingredientIcon} />
      );
    }
    
    // Fallback colored circle based on ingredient name
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const colorIndex = ingredient.name.length % colors.length;
    
    return (
      <View style={[styles.ingredientIconFallback, { backgroundColor: colors[colorIndex] }]} />
    );
  };

  const renderCocktailSection = (item: any) => {
    const expanded = isExpanded(item.cocktailId);
    const completedIngredients = item.ingredients.filter((ing: any) => ing.completed).length;
    const totalIngredients = item.ingredients.length;

    return (
      <View key={item.id} style={styles.cocktailSection}>
        {/* Cocktail Header */}
        <TouchableOpacity 
          style={styles.cocktailHeader}
          onPress={() => toggleCocktailExpansion(item.cocktailId)}
        >
          <View style={styles.cocktailHeaderLeft}>
            <Text style={styles.cocktailName}>{item.cocktailName}</Text>
            <Text style={styles.servingsText}>{item.servings} {item.servings === 1 ? 'serving' : 'servings'}</Text>
          </View>
          <View style={styles.cocktailHeaderRight}>
            <Text style={styles.progressText}>
              {completedIngredients}/{totalIngredients}
            </Text>
            {expanded ? (
              <ChevronUp size={20} color={Colors.typography.secondary} />
            ) : (
              <ChevronDown size={20} color={Colors.typography.secondary} />
            )}
          </View>
        </TouchableOpacity>

        {/* Ingredients List */}
        {expanded && (
          <View style={styles.ingredientsList}>
            {item.ingredients.map((ingredient: any, index: number) => (
              <TouchableOpacity
                key={`${item.cocktailId}-${ingredient.name}-${index}`}
                style={[
                  styles.ingredientItem,
                  ingredient.completed && styles.completedIngredient
                ]}
                onPress={() => toggleIngredient(item.cocktailId, ingredient.name)}
              >
                <View style={styles.ingredientLeft}>
                  {renderIngredientIcon(ingredient)}
                  <View style={styles.ingredientInfo}>
                    <Text style={[
                      styles.ingredientName,
                      ingredient.completed && styles.completedText
                    ]}>
                      {ingredient.name}
                    </Text>
                    <Text style={[
                      styles.ingredientQuantity,
                      ingredient.completed && styles.completedText
                    ]}>
                      {ingredient.quantity} {ingredient.unit}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.ingredientRight}>
                  <View style={[
                    styles.checkbox,
                    ingredient.completed && styles.checkedBox
                  ]}>
                    {ingredient.completed && <Check size={16} color={Colors.typography.primary} />}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            {/* Remove cocktail button */}
            <TouchableOpacity 
              style={styles.removeCocktailButton}
              onPress={() => removeFromShoppingList(item.id)}
            >
              <Trash2 size={16} color={Colors.error} />
              <Text style={styles.removeCocktailText}>Remove cocktail</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (shoppingList.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Shopping List</Text>
          <Text style={styles.subtitle}>Your shopping list is empty</Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Add cocktails to your shopping list from the cocktail detail pages
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.subtitle}>
          {completedItems} of {totalItems} items completed
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {shoppingList.map(renderCocktailSection)}
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
    paddingHorizontal: Layout.spacing.double,
    paddingVertical: Layout.spacing.double,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.double,
  },
  emptyStateText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  cocktailSection: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
    overflow: 'hidden',
  },
  cocktailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  cocktailHeaderLeft: {
    flex: 1,
  },
  cocktailName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  servingsText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.typography.secondary,
  },
  cocktailHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  progressText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.typography.secondary,
  },
  ingredientsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Layout.spacing.sm,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
  },
  completedIngredient: {
    opacity: 0.6,
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ingredientIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Layout.spacing.md,
  },
  ingredientIconFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Layout.spacing.md,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  ingredientQuantity: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.typography.secondary,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  ingredientRight: {
    marginLeft: Layout.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: Colors.primary,
  },
  removeCocktailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  removeCocktailText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.error,
    marginLeft: Layout.spacing.xs,
  },
});