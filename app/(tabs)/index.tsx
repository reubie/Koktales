import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SectionHeader from '@/components/SectionHeader';
import CategoryCard from '@/components/CategoryCard';
import CocktailCard from '@/components/CocktailCard';
import SideMenu from '@/components/SideMenu';
import { categories, cocktails, CategoryType } from '@/constants/Cocktails';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const getLockedCocktails = (cocktailsArr: typeof cocktails) => {
    return cocktailsArr.map((cocktail, idx) => {
      if (cocktail.type === 'free') return { ...cocktail, isLocked: false };
      return { ...cocktail, isLocked: idx >= 2 };
    });
  };

  const popularCocktails = getLockedCocktails(cocktails.filter(cocktail => cocktail.category === 'Popular'));
  const classicCocktails = getLockedCocktails(cocktails.filter(cocktail => cocktail.category === 'Classics'));

  const handleCategoryPress = (category: CategoryType) => {
    router.push(`/categories/${category.id}`);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleViewAllCategories = () => {
    router.push('/categories');
  };

  const handleViewAllPopular = () => {
    router.push('/popular');
  };

  const handleViewAllClassics = () => {
    router.push('/classics');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header
        title="KokTales"
        subtitle="Let's mix a drink!"
        onMenuPress={() => setShowMenu(true)}
        onNotificationPress={() => router.push('/notifications')}
      />
      <SearchBar 
        onSearch={handleSearch} 
        onFilterPress={handleFilterPress}
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionHeader
          title="Categories"
          onViewAllPress={handleViewAllCategories}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={handleCategoryPress}
            />
          ))}
        </ScrollView>

        <SectionHeader
          title="Popular Cocktails"
          onViewAllPress={handleViewAllPopular}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cocktailsContainer}
        >
          {popularCocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} isLocked={cocktail.isLocked} />
          ))}
        </ScrollView>

        <SectionHeader
          title="Classic Recipes"
          onViewAllPress={handleViewAllClassics}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cocktailsContainer}
        >
          {classicCocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} isLocked={cocktail.isLocked} />
          ))}
        </ScrollView>
      </ScrollView>

      {showMenu && (
        <View style={StyleSheet.absoluteFill}>
          <SideMenu onClose={() => setShowMenu(false)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  categoriesContainer: {
    paddingLeft: Layout.spacing.lg,
    paddingRight: Layout.spacing.sm,
  },
  cocktailsContainer: {
    paddingLeft: Layout.spacing.lg,
    paddingRight: Layout.spacing.sm,
    paddingBottom: Layout.spacing.lg,
  },
});