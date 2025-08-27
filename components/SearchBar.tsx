import { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { Search, FileSliders as Sliders } from 'lucide-react-native';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
};

export default function SearchBar({ 
  placeholder = 'Search for cocktails',
  onSearch,
  onFilterPress 
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  const handleChangeText = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.typography.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.typography.secondary}
          value={searchText}
          onChangeText={handleChangeText}
        />
      </View>
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <Sliders size={20} color={Colors.typography.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginVertical: Layout.spacing.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.entryField,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  input: {
    fontFamily: 'Roboto',
    flex: 1,
    fontSize: 16,
    color: Colors.typography.secondary,
    height: '100%',
  },
  filterButton: {
    backgroundColor: Colors.primary,
    width: 48,
    height: 48,
    borderRadius: Layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.md,
  },
});