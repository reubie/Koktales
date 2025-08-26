import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  // Mock favorites data
  const favorites = [
    { id: '1', name: 'Classic Margarita', category: 'Cocktails' },
    { id: '2', name: 'Old Fashioned', category: 'Whiskey' },
    { id: '3', name: 'Mojito', category: 'Rum' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved cocktail recipes</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <TouchableOpacity key={favorite.id} style={styles.favoriteItem}>
              <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteName}>{favorite.name}</Text>
                <Text style={styles.favoriteCategory}>{favorite.category}</Text>
              </View>
              <Heart size={20} color={Colors.primary} fill={Colors.primary} />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Heart size={48} color={Colors.typography.secondary} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>Start exploring and save your favorite cocktails</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
    marginBottom: Layout.spacing.xs,
  },
  favoriteCategory: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.spacing.quadruple,
  },
  emptyTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
  },
  emptySubtitle: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
    textAlign: 'center',
    paddingHorizontal: Layout.spacing.double,
  },
});