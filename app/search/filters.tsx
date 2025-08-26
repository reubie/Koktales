import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function SearchFiltersScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const timeRanges = ['Under 5 min', '5-10 min', 'Over 10 min'];

  const handleBack = () => {
    router.back();
  };

  const handleApply = () => {
    // Handle filter application
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty</Text>
          <View style={styles.optionsContainer}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.option,
                  selectedDifficulty === difficulty && styles.selectedOption
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDifficulty === difficulty && styles.selectedOptionText
                ]}>
                  {difficulty}
                </Text>
                {selectedDifficulty === difficulty && (
                  <Check size={16} color={Colors.typography.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparation Time</Text>
          <View style={styles.optionsContainer}>
            {timeRanges.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.option,
                  selectedTime === time && styles.selectedOption
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.optionText,
                  selectedTime === time && styles.selectedOptionText
                ]}>
                  {time}
                </Text>
                {selectedTime === time && (
                  <Check size={16} color={Colors.typography.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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
    paddingTop: Layout.spacing.triple,
    paddingHorizontal: Layout.spacing.double,
    paddingBottom: Layout.spacing.md,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
  },
  applyButton: {
    padding: Layout.spacing.sm,
  },
  applyButtonText: {
    ...Fonts.body2,
    color: Colors.primary,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  section: {
    marginTop: Layout.spacing.double,
  },
  sectionTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.md,
  },
  optionsContainer: {
    gap: Layout.spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
  },
  selectedOptionText: {
    color: Colors.typography.primary,
  },
});