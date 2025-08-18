import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft } from 'lucide-react-native';

const strengthOptions = ['Strong', 'Light', 'Non-alcoholic'];
const groupOptions = ['Classic', 'Hot', 'Dessert', 'Long'];
const techniqueOptions = [
  'Shake', 'Hard-shake', 'Stirring',
  'Throwing', 'Muddling', 'Spanking',
  'Rolling'
];

export default function FiltersScreen() {
  const [selectedStrength, setSelectedStrength] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);

  const toggleSelection = (array: string[], setArray: (value: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const clearAll = () => {
    setSelectedStrength([]);
    setSelectedGroups([]);
    setSelectedTechniques([]);
  };

  const applyFilters = () => {
    // Apply filters logic here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Drink strength</Text>
        <View style={styles.optionsContainer}>
          {strengthOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedStrength.includes(option) && styles.selectedOption
              ]}
              onPress={() => toggleSelection(selectedStrength, setSelectedStrength, option)}
            >
              <Text style={[
                styles.optionText,
                selectedStrength.includes(option) && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Group</Text>
        <View style={styles.optionsContainer}>
          {groupOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedGroups.includes(option) && styles.selectedOption
              ]}
              onPress={() => toggleSelection(selectedGroups, setSelectedGroups, option)}
            >
              <Text style={[
                styles.optionText,
                selectedGroups.includes(option) && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Techniques</Text>
        <View style={styles.optionsContainer}>
          {techniqueOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedTechniques.includes(option) && styles.selectedOption
              ]}
              onPress={() => toggleSelection(selectedTechniques, setSelectedTechniques, option)}
            >
              <Text style={[
                styles.optionText,
                selectedTechniques.includes(option) && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearAll}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  backButton: {
    marginRight: Layout.spacing.md,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  sectionTitle: {
    ...Fonts.subheading,
    fontSize: 18,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.xl,
  },
  optionButton: {
    backgroundColor: Colors.gray[800],
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  selectedOption: {
    backgroundColor: Colors.secondary[500],
  },
  optionText: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.gray[400],
  },
  selectedOptionText: {
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    padding: Layout.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[800],
  },
  clearButton: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    marginRight: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.secondary[500],
    alignItems: 'center',
  },
  clearButtonText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.secondary[500],
  },
  applyButton: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.secondary[500],
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  applyButtonText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.white,
  },
});