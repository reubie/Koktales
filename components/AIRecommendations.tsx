import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Sparkles, Clock, Star, TrendingUp } from 'lucide-react-native';

type Recommendation = {
  id: string;
  name: string;
  image: string;
  description: string;
  matchScore: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reason: string;
};

export default function AIRecommendations() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'quick' | 'trending'>('all');

  const recommendations: Recommendation[] = [
    {
      id: '1',
      name: 'Summer Breeze Mojito',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
      description: 'A refreshing twist on the classic mojito with seasonal fruits',
      matchScore: 95,
      prepTime: '5 min',
      difficulty: 'Easy',
      reason: 'Based on your preference for refreshing drinks and citrus flavors',
    },
    {
      id: '2',
      name: 'Smoky Old Fashioned',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
      description: 'A sophisticated take on the classic with a smoky twist',
      matchScore: 88,
      prepTime: '8 min',
      difficulty: 'Medium',
      reason: 'Matches your interest in classic cocktails and whiskey',
    },
    // Add more recommendations as needed
  ];

  const filteredRecommendations = recommendations.filter((rec) => {
    if (selectedFilter === 'quick') return rec.prepTime.includes('5');
    if (selectedFilter === 'trending') return rec.matchScore > 90;
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Sparkles size={24} color={Colors.secondary[500]} />
          <Text style={styles.title}>AI Recommendations</Text>
        </View>
        <Text style={styles.subtitle}>
          Personalized cocktail suggestions based on your preferences
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[
            styles.filterText,
            selectedFilter === 'all' && styles.filterTextActive,
          ]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'quick' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('quick')}
        >
          <Clock size={16} color={selectedFilter === 'quick' ? Colors.white : Colors.gray[400]} />
          <Text style={[
            styles.filterText,
            selectedFilter === 'quick' && styles.filterTextActive,
          ]}>Quick</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'trending' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter('trending')}
        >
          <TrendingUp size={16} color={selectedFilter === 'trending' ? Colors.white : Colors.gray[400]} />
          <Text style={[
            styles.filterText,
            selectedFilter === 'trending' && styles.filterTextActive,
          ]}>Trending</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.recommendationsList}>
        {filteredRecommendations.map((recommendation) => (
          <TouchableOpacity key={recommendation.id} style={styles.recommendationCard}>
            <Image
              source={{ uri: recommendation.image }}
              style={styles.recommendationImage}
            />
            <View style={styles.recommendationContent}>
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationName}>{recommendation.name}</Text>
                <View style={styles.matchScore}>
                  <Star size={16} color={Colors.secondary[500]} />
                  <Text style={styles.matchScoreText}>{recommendation.matchScore}%</Text>
                </View>
              </View>
              <Text style={styles.recommendationDescription}>
                {recommendation.description}
              </Text>
              <View style={styles.recommendationMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color={Colors.gray[400]} />
                  <Text style={styles.metaText}>{recommendation.prepTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaText}>{recommendation.difficulty}</Text>
                </View>
              </View>
              <Text style={styles.recommendationReason}>
                {recommendation.reason}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  header: {
    padding: Layout.spacing.xl,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.white,
    marginLeft: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
  },
  filtersContainer: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: Colors.secondary[500],
  },
  filterText: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: Layout.spacing.xs,
  },
  filterTextActive: {
    color: Colors.white,
  },
  recommendationsList: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  recommendationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.lg,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recommendationContent: {
    padding: Layout.spacing.lg,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  recommendationName: {
    ...Fonts.subheading,
    fontSize: 18,
    color: Colors.white,
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchScoreText: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.secondary[500],
    marginLeft: Layout.spacing.xs,
  },
  recommendationDescription: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
    marginBottom: Layout.spacing.md,
  },
  recommendationMeta: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  metaText: {
    ...Fonts.caption,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: Layout.spacing.xs,
  },
  recommendationReason: {
    ...Fonts.caption,
    fontSize: 12,
    color: Colors.gray[500],
    fontStyle: 'italic',
  },
}); 