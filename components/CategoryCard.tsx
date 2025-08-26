import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { CategoryType } from '@/constants/Cocktails';

type CategoryCardProps = {
  category: CategoryType;
  onPress: (category: CategoryType) => void;
};

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: category.image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.name}>{category.name}</Text>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{category.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    borderRadius: Layout.borderRadius.lg,
    marginRight: Layout.spacing.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.md,
  },
  name: {
    ...Fonts.headline3,
    fontSize: 18,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  countContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  count: {
    ...Fonts.body3,
    fontSize: 12,
    color: Colors.typography.primary,
  },
});