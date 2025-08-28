import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Heart, Bookmark, Star, Clock, Droplets, Zap } from 'lucide-react-native';

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Popular', 'New', 'Classic', 'Light', 'Strong', 'Bitter', 'Sweet'];

  const featuredCocktails = [
    {
      id: '1',
      name: 'Negroni 2.0',
      author: 'By Adam White',
      ingredients: 'Martini Bitter, Gin, Rum, strawberry',
      rating: '4.8',
      volume: '150 ml',
      time: '3 min',
      difficulty: 'easy',
      image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg'
    },
    {
      id: '2',
      name: 'Sunny',
      author: 'By Adam White',
      ingredients: 'Martini Bitter, Gin, Rum, strawberry',
      rating: '4.8',
      volume: '80 ml',
      time: '2 min',
      difficulty: 'easy',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg'
    }
  ];

  const cocktailList = [
    {
      id: '3',
      name: 'Mohito',
      category: 'Classic • Light',
      ingredients: 'White Rum, soda, lime, mint',
      rating: '4.8',
      volume: '150 ml',
      difficulty: 'easy',
      image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg'
    },
    {
      id: '4',
      name: 'Strawberry cocktail',
      category: "Chef's • Strong",
      ingredients: 'Vodka, Rum, strawberry, lemon, mint',
      rating: '4.3',
      volume: '90 ml',
      difficulty: 'easy',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg'
    }
  ];

  const articles = [
    {
      id: '1',
      title: 'Where to go this weekend?',
      author: 'INSHAKER team',
      date: 'Aug. 12',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg'
    },
    {
      id: '2',
      title: 'Chris Lungo - the best bartender of America',
      author: 'Chris Lungo',
      date: 'Aug. 10',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    }
  ];

    return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>
          <Text style={styles.appNameFirst}>Kok</Text>
          <Text style={styles.appNameSecond}>Tales</Text>
        </Text>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>U</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>

        {/* Top of the Day Section */}
        <View style={styles.topOfDaySection}>
          <Text style={styles.sectionTitle}>Top of the day</Text>
          <View style={styles.featuredCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg' }} 
              style={styles.featuredImage} 
            />
            <View style={styles.featuredOverlay}>
              <View style={styles.ratingBadge}>
                <Star size={16} color={Colors.typography.primary} fill={Colors.typography.primary} />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>Summertime Sadness</Text>
                <Text style={styles.featuredAuthor}>By Chris Lungo</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Articles Section */}
        <View style={styles.articlesSection}>
          <Text style={styles.sectionTitle}>Articles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
            {filters.slice(0, 4).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  activeFilter === filter && styles.activeFilterTab
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterTabText,
                  activeFilter === filter && styles.activeFilterTabText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.articlesList}>
            {articles.map((article) => (
              <TouchableOpacity key={article.id} style={styles.articleCard}>
                <View style={styles.articleContent}>
                  <View style={styles.articleText}>
                    <Text style={styles.articleCategory}>Where to go?</Text>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articleMeta}>
                      {article.author} • {article.date} • {article.readTime}
                    </Text>
                  </View>
                  <View style={styles.articleImageContainer}>
                    <Image source={{ uri: article.image }} style={styles.articleImage} />
                    <TouchableOpacity style={styles.heartButton}>
                      <Heart size={16} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Following Section */}
        <View style={styles.followingSection}>
          <Text style={styles.sectionTitle}>Following</Text>
          <View style={styles.followingMeta}>
            <Text style={styles.followingMetaText}>Chris Lungo • Aug 10 • 5 min read</Text>
            <View style={styles.followingThumbnail}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }} 
                style={styles.thumbnailImage} 
              />
            </View>
            <TouchableOpacity style={styles.seeMoreLink}>
              <Text style={styles.seeMoreLinkText}>See more {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.followingScroll}>
            {featuredCocktails.map((cocktail) => (
              <TouchableOpacity 
                key={cocktail.id} 
                style={styles.followingCard}
                onPress={() => router.push(`/cocktail/${cocktail.id}`)}
              >
                <Image source={{ uri: cocktail.image }} style={styles.followingCardImage} />
                <View style={styles.followingCardOverlay}>
                  <View style={styles.cardIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                      <Heart size={20} color={Colors.typography.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                      <Bookmark size={20} color={Colors.typography.primary} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.followingCardContent}>
                    <Text style={styles.followingCardTitle}>{cocktail.name}</Text>
                    <Text style={styles.followingCardAuthor}>{cocktail.author}</Text>
                    <Text style={styles.followingCardIngredients}>{cocktail.ingredients}</Text>
                    <View style={styles.followingCardDetails}>
                      <View style={styles.detailItem}>
                        <Star size={14} color={Colors.typography.secondary} fill={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.rating}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Droplets size={14} color={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.volume}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Clock size={14} color={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.time}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Zap size={14} color={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.difficulty}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Cocktails Section */}
        <View style={styles.cocktailsSection}>
          <Text style={styles.sectionTitle}>Cocktails</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
            {filters.slice(4).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  activeFilter === filter && styles.activeFilterTab
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterTabText,
                  activeFilter === filter && styles.activeFilterTabText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
                  <View style={styles.cocktailsGrid}>
          {cocktailList.map((cocktail) => (
            <TouchableOpacity 
              key={cocktail.id} 
              style={styles.cocktailCard}
              onPress={() => router.push(`/cocktail/${cocktail.id}`)}
            >
                <Image source={{ uri: cocktail.image }} style={styles.cocktailCardImage} />
                <View style={styles.cocktailCardOverlay}>
                  <View style={styles.cardIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                      <Heart size={20} color={Colors.typography.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                      <Bookmark size={20} color={Colors.typography.primary} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cocktailCardContent}>
                    <Text style={styles.cocktailCardCategory}>{cocktail.category}</Text>
                    <Text style={styles.cocktailCardTitle}>{cocktail.name}</Text>
                    <Text style={styles.cocktailCardIngredients}>{cocktail.ingredients}</Text>
                    <View style={styles.cocktailCardDetails}>
                      <View style={styles.detailItem}>
                        <Star size={14} color={Colors.typography.secondary} fill={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.rating}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Droplets size={14} color={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.volume}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Zap size={14} color={Colors.typography.secondary} />
                        <Text style={styles.detailText}>{cocktail.difficulty}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.quadruple,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Layout.spacing.triple,
    paddingHorizontal: Layout.spacing.double,
    paddingBottom: Layout.spacing.md,
  },
  appName: {
    ...Fonts.headline2,
    fontSize: 24,
  },
  appNameFirst: {
    color: Colors.typography.primary,
  },
  appNameSecond: {
    color: Colors.primary,
  },
  profileButton: {
    padding: Layout.spacing.sm,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    ...Fonts.headline3,
    color: Colors.primary,
    fontSize: 18,
  },
  searchBar: {
    marginHorizontal: Layout.spacing.double,
    marginBottom: Layout.spacing.double,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
  },
  searchPlaceholder: {
    ...Fonts.body2,
    color: Colors.typography.secondary,
    fontSize: 16,
  },
  topOfDaySection: {
    marginBottom: Layout.spacing.quadruple,
  },
  sectionTitle: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginHorizontal: Layout.spacing.double,
    marginBottom: Layout.spacing.md,
  },
  featuredCard: {
    marginHorizontal: Layout.spacing.double,
    height: 200,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  ratingBadge: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    gap: Layout.spacing.xs,
  },
  ratingText: {
    ...Fonts.body3,
    color: Colors.typography.primary,
    fontSize: 14,
  },
  featuredContent: {
    position: 'absolute',
    bottom: Layout.spacing.md,
    left: Layout.spacing.md,
  },
  featuredTitle: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  featuredAuthor: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 14,
  },
  articlesSection: {
    marginBottom: Layout.spacing.quadruple,
  },
  filterTabs: {
    marginHorizontal: Layout.spacing.double,
    marginBottom: Layout.spacing.md,
  },
  filterTab: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    marginRight: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.surface,
  },
  activeFilterTab: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 14,
  },
  activeFilterTabText: {
    color: Colors.typography.primary,
  },
  articlesList: {
    paddingHorizontal: Layout.spacing.double,
  },
  articleCard: {
    marginBottom: Layout.spacing.md,
  },
  articleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleText: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  articleCategory: {
    ...Fonts.body3,
    color: Colors.primary,
    fontSize: 12,
    marginBottom: Layout.spacing.xs,
  },
  articleTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
    lineHeight: 20,
  },
  articleMeta: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
  },
  articleImageContainer: {
    position: 'relative',
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.md,
  },
  heartButton: {
    position: 'absolute',
    top: Layout.spacing.xs,
    right: Layout.spacing.xs,
    padding: Layout.spacing.xs,
  },
  seeMoreButton: {
    alignSelf: 'flex-start',
    marginTop: Layout.spacing.sm,
  },
  seeMoreText: {
    ...Fonts.body2,
    color: Colors.primary,
    fontSize: 14,
  },
  followingSection: {
    marginBottom: Layout.spacing.quadruple,
  },
  followingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.double,
    marginBottom: Layout.spacing.md,
  },
  followingMetaText: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
    flex: 1,
  },
  followingThumbnail: {
    marginRight: Layout.spacing.sm,
  },
  thumbnailImage: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.sm,
  },
  seeMoreLink: {
    padding: Layout.spacing.xs,
  },
  seeMoreLinkText: {
    ...Fonts.body2,
    color: Colors.primary,
    fontSize: 12,
  },
  followingScroll: {
    paddingHorizontal: Layout.spacing.double,
  },
  followingCard: {
    width: 200,
    height: 250,
    marginRight: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  followingCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  followingCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Layout.spacing.sm,
  },
  iconButton: {
    padding: Layout.spacing.xs,
  },
  followingCardContent: {
    position: 'absolute',
    bottom: Layout.spacing.md,
    left: Layout.spacing.md,
    right: Layout.spacing.md,
  },
  followingCardTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  followingCardAuthor: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
    marginBottom: Layout.spacing.xs,
  },
  followingCardIngredients: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
    marginBottom: Layout.spacing.sm,
  },
  followingCardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  detailText: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 10,
  },
  cocktailsSection: {
    marginBottom: Layout.spacing.quadruple,
  },
  cocktailsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.double,
    gap: Layout.spacing.md,
  },
  cocktailCard: {
    flex: 1,
    height: 280,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  cocktailCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cocktailCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  cocktailCardContent: {
    position: 'absolute',
    bottom: Layout.spacing.md,
    left: Layout.spacing.md,
    right: Layout.spacing.md,
  },
  cocktailCardCategory: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
    marginBottom: Layout.spacing.xs,
  },
  cocktailCardTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  cocktailCardIngredients: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
    marginBottom: Layout.spacing.sm,
  },
  cocktailCardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
});