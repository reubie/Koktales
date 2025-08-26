import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import SearchBar from '@/components/SearchBar';
import BartenderList from '@/components/BartenderList';
import BarList from '@/components/BarList';
import ArticleList from '@/components/ArticleList';
import { Search } from 'lucide-react-native';

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState<'bars' | 'bartenders' | 'articles'>('bars');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => router.push('/search')}
        >
          <Search size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
      </View>

      <SearchBar 
        placeholder="Search for bars, bartenders, or articles"
        onFilterPress={() => router.push('/search/filters')}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'bars' && styles.activeTab]}
          onPress={() => setActiveTab('bars')}
        >
          <Text style={[styles.tabText, activeTab === 'bars' && styles.activeTabText]}>
            Bars
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'bartenders' && styles.activeTab]}
          onPress={() => setActiveTab('bartenders')}
        >
          <Text style={[styles.tabText, activeTab === 'bartenders' && styles.activeTabText]}>
            Bartenders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'articles' && styles.activeTab]}
          onPress={() => setActiveTab('articles')}
        >
          <Text style={[styles.tabText, activeTab === 'articles' && styles.activeTabText]}>
            Articles
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'bars' ? (
          <BarList />
        ) : activeTab === 'bartenders' ? (
          <BartenderList />
        ) : (
          <ArticleList />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  title: {
    ...Fonts.headline2,
    fontSize: 32,
    color: Colors.typography.primary,
  },
  searchButton: {
    padding: Layout.spacing.sm,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  tab: {
    marginRight: Layout.spacing.lg,
    paddingBottom: Layout.spacing.sm,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.typography.secondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
});