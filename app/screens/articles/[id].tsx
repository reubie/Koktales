import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import Header from '@/components/Header';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Article" showNotification={false} />
      
      <ScrollView style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg' }}
          style={styles.image}
        />
        
        <View style={styles.articleContent}>
          <Text style={styles.title}>Where to go this weekend?</Text>
          <Text style={styles.metadata}>By KokTales team • 5 min read</Text>
          
          <Text style={styles.paragraph}>
            Looking for the perfect spot to enjoy your weekend? We've curated a list of the best bars
            and lounges in your area, each offering unique cocktail experiences and ambiance.
          </Text>
          
          {/* Add more content as needed */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: Layout.spacing.lg,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.sm,
  },
  metadata: {
    ...Fonts.caption,
    fontSize: 14,
    color: Colors.gray[500],
    marginBottom: Layout.spacing.lg,
  },
  paragraph: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[700],
    lineHeight: 24,
    marginBottom: Layout.spacing.md,
  },
});