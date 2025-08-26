import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import SearchBar from '@/components/SearchBar';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => router.push('/screens/search/filters')}
        >
          <SlidersHorizontal size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <SearchBar 
        placeholder="Search for cocktails, bars, or bartenders"
      />

      <ScrollView style={styles.content}>
        {/* Search results will be displayed here */}
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
  backButton: {
    padding: Layout.spacing.sm,
  },
  title: {
    ...Fonts.headline3,
    fontSize: 24,
    color: Colors.white,
  },
  filterButton: {
    padding: Layout.spacing.sm,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
}); 