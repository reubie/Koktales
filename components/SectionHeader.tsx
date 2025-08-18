import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { ChevronRight } from 'lucide-react-native';

type SectionHeaderProps = {
  title: string;
  showViewAll?: boolean;
  onViewAllPress?: () => void;
};

export default function SectionHeader({
  title,
  showViewAll = true,
  onViewAllPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={onViewAllPress}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color={Colors.primary[600]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    marginTop: Layout.spacing.lg,
  },
  title: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.gray[800],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.primary[600],
    marginRight: 4,
  },
});