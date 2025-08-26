import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Settings, LogOut, Heart, Clock, BookOpen, Award, ChevronRight, X, Search, ShoppingBag } from 'lucide-react-native';

export default function SideMenu({ onClose }: { onClose: () => void }) {
  const handleLogout = () => {
    router.replace('/auth/verify-age');
  };

  const menuItems = [
    {
      id: '1',
      title: 'Discover',
      icon: Search,
      onPress: () => router.push('/search'),
    },
    {
      id: '2',
      title: 'Favorites',
      icon: Heart,
      onPress: () => router.push('/favorites'),
    },
    {
      id: '3',
      title: 'Shopping List',
      icon: ShoppingBag,
      onPress: () => router.push('/shopping-list'),
    },
    {
      id: '4',
      title: 'Profile',
      icon: Award,
      onPress: () => router.push('/profile'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              item.onPress();
              onClose();
            }}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.iconContainer}>
                <item.icon size={24} color={Colors.primary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color={Colors.typography.secondary} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={handleLogout}
        >
          <View style={styles.menuItemContent}>
            <View style={[styles.iconContainer, styles.logoutIcon]}>
              <LogOut size={24} color={Colors.error} />
            </View>
            <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    paddingTop: Layout.spacing.triple,
    paddingHorizontal: Layout.spacing.double,
    paddingBottom: Layout.spacing.md,
  },
  closeButton: {
    padding: Layout.spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.entryField,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  logoutIcon: {
    backgroundColor: Colors.error,
  },
  menuItemText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: Layout.spacing.double,
  },
  logoutText: {
    color: Colors.error,
  },
});