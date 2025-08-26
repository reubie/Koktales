import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, Clock, Star, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PopularScreen() {
  const popular = [
    { id: '1', name: 'Margarita', time: '5 min', rating: 4.9, trending: true },
    { id: '2', name: 'Mojito', time: '6 min', rating: 4.8, trending: true },
    { id: '3', name: 'Cosmopolitan', time: '7 min', rating: 4.7, trending: false },
    { id: '4', name: 'Pina Colada', time: '8 min', rating: 4.6, trending: true },
    { id: '5', name: 'Gin & Tonic', time: '3 min', rating: 4.5, trending: false },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleCocktailPress = (id: string) => {
    router.push(`/cocktail/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Popular Cocktails</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          The most loved and trending cocktail recipes from our community.
        </Text>

        <View style={styles.cocktailsList}>
          {popular.map((cocktail) => (
            <TouchableOpacity 
              key={cocktail.id} 
              style={styles.cocktailItem}
              onPress={() => handleCocktailPress(cocktail.id)}
            >
              <View style={styles.cocktailInfo}>
                <View style={styles.cocktailHeader}>
                  <Text style={styles.cocktailName}>{cocktail.name}</Text>
                  {cocktail.trending && (
                    <View style={styles.trendingBadge}>
                      <TrendingUp size={12} color={Colors.primary} />
                    </View>
                  )}
                </View>
                <View style={styles.cocktailMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={Colors.typography.secondary} />
                    <Text style={styles.metaText}>{cocktail.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Star size={14} color={Colors.primary} fill={Colors.primary} />
                    <Text style={styles.metaText}>{cocktail.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  description: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
    marginBottom: Layout.spacing.double,
    lineHeight: 22,
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
    gap: Layout.spacing.sm,
  },
  cocktailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cocktailName: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
    flex: 1,
  },
  trendingBadge: {
    backgroundColor: Colors.entryField,
    padding: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.xs,
  },
  cocktailMeta: {
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
    fontSize: 13,
  },
});