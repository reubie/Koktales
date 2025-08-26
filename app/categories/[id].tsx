import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft } from 'lucide-react-native';

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock category data
  const category = {
    id: id as string,
    name: 'Classic Cocktails',
    description: 'Timeless recipes that have stood the test of time',
    cocktails: [
      { id: '1', name: 'Old Fashioned', difficulty: 'Easy', time: '5 min' },
      { id: '2', name: 'Manhattan', difficulty: 'Medium', time: '7 min' },
      { id: '3', name: 'Martini', difficulty: 'Easy', time: '4 min' },
    ]
  };

  const handleBack = () => {
    router.back();
  };

  const handleCocktailPress = (cocktailId: string) => {
    router.push(`/cocktail/${cocktailId}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryInfo}>
          <Text style={styles.description}>{category.description}</Text>
          <Text style={styles.cocktailCount}>{category.cocktails.length} cocktails</Text>
        </View>

        <View style={styles.cocktailsList}>
          {category.cocktails.map((cocktail) => (
            <TouchableOpacity 
              key={cocktail.id} 
              style={styles.cocktailItem}
              onPress={() => handleCocktailPress(cocktail.id)}
            >
              <View style={styles.cocktailInfo}>
                <Text style={styles.cocktailName}>{cocktail.name}</Text>
                <View style={styles.cocktailMeta}>
                  <Text style={styles.metaText}>{cocktail.difficulty}</Text>
                  <Text style={styles.metaText}>•</Text>
                  <Text style={styles.metaText}>{cocktail.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    paddingBottom: Layout.spacing.md,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  categoryInfo: {
    marginBottom: Layout.spacing.double,
  },
  description: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
    marginBottom: Layout.spacing.sm,
    lineHeight: 22,
  },
  cocktailCount: {
    ...Fonts.body3,
    color: Colors.primary,
    fontSize: 14,
  },
  cocktailsList: {
    gap: Layout.spacing.md,
  },
  cocktailItem: {
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  cocktailInfo: {
    gap: Layout.spacing.xs,
  },
  cocktailName: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
  },
  cocktailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  metaText: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 13,
  },
});