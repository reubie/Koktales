import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Bookmark } from 'lucide-react-native';

const articles = [
  {
    id: '1',
    title: 'The Art of Mixology',
    description: 'Learn the fundamentals of cocktail making and essential techniques.',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
    readTime: '5 min read',
    category: 'Mixology'
  },
  {
    id: '2',
    title: 'Top 10 Summer Cocktails',
    description: 'Discover refreshing cocktails perfect for hot summer days.',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
    readTime: '3 min read',
    category: 'Seasonal'
  },
  {
    id: '3',
    title: 'Bar Etiquette Guide',
    description: 'Essential tips for proper bar behavior and ordering drinks.',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
    readTime: '4 min read',
    category: 'Guide'
  }
];

export default function ArticleList() {
  return (
    <ScrollView style={styles.container}>
      {articles.map((article) => (
        <TouchableOpacity
          key={article.id}
          style={styles.articleCard}
          onPress={() => router.push(`/articles/${article.id}`)}
        >
          <Image source={{ uri: article.image }} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.category}>{article.category}</Text>
              <TouchableOpacity>
                <Bookmark size={20} color={Colors.typography.secondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.description}>{article.description}</Text>
            <Text style={styles.readTime}>{article.readTime}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  articleCard: {
          backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  category: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: Colors.primary,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.sm,
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.secondary,
    marginBottom: Layout.spacing.md,
  },
  readTime: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: Colors.typography.secondary,
  },
}); 