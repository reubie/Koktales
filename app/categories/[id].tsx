import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import CocktailCard from '@/components/CocktailCard';
import { categories, cocktails } from '@/constants/Cocktails';

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const category = categories.find(c => c.id === id);
  const categoryCocktails = cocktails.filter(c => c.category === category?.name);

  // Mark first 2 free, rest locked
  const cocktailsWithLock = categoryCocktails.map((cocktail, idx) => {
    if (cocktail.type === 'free') return { ...cocktail, isLocked: false };
    // Only first 2 cocktails (regardless of type) are free to view
    return { ...cocktail, isLocked: idx >= 2 };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={category?.name || 'Category'} 
        showNotification={false} 
        onBackPress={() => router.back()}
      />
      
      <FlatList
        data={cocktailsWithLock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CocktailCard cocktail={item} horizontal={true} isLocked={item.isLocked} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  listContent: {
    padding: Layout.spacing.lg,
  },
});