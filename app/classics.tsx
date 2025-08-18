import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import CocktailCard from '@/components/CocktailCard';
import { cocktails } from '@/constants/Cocktails';

export default function ClassicCocktailsScreen() {
  const classicCocktails = cocktails.filter(cocktail => cocktail.category === 'Classics');
  const lockedClassicCocktails = classicCocktails.map((cocktail, idx) => {
    if (cocktail.type === 'free') return { ...cocktail, isLocked: false };
    return { ...cocktail, isLocked: idx >= 2 };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Classic Recipes" showNotification={false} />
      
      <FlatList
        data={lockedClassicCocktails}
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