import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ShoppingCart, Plus, Check } from 'lucide-react-native';
import { useState } from 'react';

export default function ShoppingListScreen() {
  const [items, setItems] = useState([
    { id: '1', name: 'Tequila Blanco', category: 'Spirits', completed: false },
    { id: '2', name: 'Fresh Limes', category: 'Produce', completed: true },
    { id: '3', name: 'Triple Sec', category: 'Liqueurs', completed: false },
    { id: '4', name: 'Coarse Salt', category: 'Pantry', completed: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.subtitle}>{completedCount} of {totalCount} items completed</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.item, item.completed && styles.completedItem]}
            onPress={() => toggleItem(item.id)}
          >
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, item.completed && styles.completedText]}>
                {item.name}
              </Text>
              <Text style={[styles.itemCategory, item.completed && styles.completedText]}>
                {item.category}
              </Text>
            </View>
            <View style={[styles.checkbox, item.completed && styles.checkedBox]}>
              {item.completed && <Check size={16} color={Colors.typography.primary} />}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.typography.primary} />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
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
    paddingHorizontal: Layout.spacing.double,
    paddingVertical: Layout.spacing.double,
  },
  title: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  completedItem: {
    opacity: 0.6,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
    marginBottom: Layout.spacing.xs,
  },
  itemCategory: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 13,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: Colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.double,
  },
  addButtonText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
    marginLeft: Layout.spacing.sm,
  },
});