import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Settings, LogOut, Heart, Clock, BookOpen, Award, ChevronRight, X, Search, ShoppingBag } from 'lucide-react-native';

type MenuItem = {
  id: string;
  title: string;
  icon: any;
  onPress: () => void;
};

type Props = {
  onClose: () => void;
};

export default function SideMenu({ onClose }: Props) {
  const handleLogout = () => {
    router.replace('/auth/verify-age');
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Discover',
      icon: Search,
      onPress: () => router.push('/screens/search'),
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
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
        >
          <X size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
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
                <item.icon size={24} color={Colors.gray[700]} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[400]} />
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
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  closeButton: {
    padding: Layout.spacing.sm,
  },
  content: {
    flex: 1,
    paddingTop: Layout.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  menuItemText: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[800],
  },
  logoutButton: {
    marginTop: Layout.spacing.xl,
  },
  logoutIcon: {
    backgroundColor: Colors.error + '10',
  },
  logoutText: {
    color: Colors.error,
  },
});