import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import Header from '@/components/Header';
import CocktailCard from '@/components/CocktailCard';
import { cocktails } from '@/constants/Cocktails';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  // Initial favorites based on the data
  const [favoriteCocktails, setFavoriteCocktails] = useState(
    cocktails.filter(cocktail => cocktail.favorite)
  );

  if (favoriteCocktails.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header title="Favorites" showNotification={false} />
        
        <View style={styles.emptyContainer}>
          <View style={styles.iconContainer}>
            <Heart size={64} color={Colors.gray[300]} />
          </View>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyMessage}>
            Start adding cocktails to your favorites to see them here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header title="Favorites" showNotification={false} />
      
      <FlatList
        data={favoriteCocktails}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CocktailCard
            cocktail={item}
            horizontal={true}
          />
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  emptyTitle: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  emptyMessage: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[500],
    textAlign: 'center',
    lineHeight: 24,
  },
});