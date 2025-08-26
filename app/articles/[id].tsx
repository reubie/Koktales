import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react-native';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock article data
  const article = {
    id: id as string,
    title: 'The Art of Mixology: Essential Techniques Every Bartender Should Know',
    author: 'By Master Mixologist',
    readTime: '8 min read',
    content: `Mixology is more than just pouring drinks—it's an art form that combines creativity, precision, and passion. In this comprehensive guide, we'll explore the fundamental techniques that form the foundation of exceptional cocktail making.

From proper shaking and stirring methods to the art of garnishing, each technique plays a crucial role in creating balanced, flavorful cocktails that delight the senses.

Whether you're a professional bartender or a home enthusiast, mastering these techniques will elevate your cocktail game and allow you to craft drinks that are both beautiful and delicious.`,
    tags: ['Mixology', 'Techniques', 'Bartending', 'Cocktails']
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.articleHeader}>
          <Text style={styles.title}>{article.title}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <BookOpen size={16} color={Colors.typography.secondary} />
              <Text style={styles.metaText}>{article.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.typography.secondary} />
              <Text style={styles.metaText}>{article.readTime}</Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {article.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.articleContent}>
          <Text style={styles.contentText}>{article.content}</Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  articleHeader: {
    marginBottom: Layout.spacing.quadruple,
  },
  title: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.double,
    lineHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: Layout.spacing.double,
    marginBottom: Layout.spacing.double,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  metaText: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  tag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  tagText: {
    ...Fonts.body3,
    color: Colors.primary,
    fontSize: 12,
  },
  articleContent: {
    marginBottom: Layout.spacing.quadruple,
  },
  contentText: {
    ...Fonts.body1,
    color: Colors.typography.primary,
    lineHeight: 24,
  },
});