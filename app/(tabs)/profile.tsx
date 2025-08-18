import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Settings, LogOut, Heart, Clock, BookOpen, Award, Edit2 } from 'lucide-react-native';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  
  const userStats = [
    { 
      id: '1', 
      title: 'Favorites', 
      value: '8', 
      icon: (props: any) => <Heart {...props} />,
      onPress: () => router.push('/(tabs)/favorites')
    },
    { 
      id: '2', 
      title: 'My Recipes', 
      value: '3', 
      icon: (props: any) => <BookOpen {...props} />,
      onPress: () => router.push('/(tabs)/my-recipes')
    },
    { 
      id: '3', 
      title: 'History', 
      value: '24', 
      icon: (props: any) => <Clock {...props} />,
      onPress: () => router.push('/(tabs)/history')
    },
    { 
      id: '4', 
      title: 'Achievements', 
      value: '5', 
      icon: (props: any) => <Award {...props} />,
      onPress: () => router.push('/(tabs)/achievements')
    },
  ];

  const menuItems = [
    { 
      id: '1', 
      title: 'Account Settings', 
      icon: Settings,
      onPress: () => router.push('/settings/account')
    },
    { 
      id: '2', 
      title: 'Preferences', 
      icon: Settings,
      onPress: () => router.push('/settings/preferences')
    },
    { 
      id: '3', 
      title: 'Help & Support', 
      icon: Settings,
      onPress: () => router.push('/settings/support')
    },
    { 
      id: '4', 
      title: 'About App', 
      icon: Settings,
      onPress: () => router.push('/settings/about')
    },
    { 
      id: '5', 
      title: 'Log Out', 
      icon: LogOut, 
      color: Colors.error,
      onPress: handleLogout
    },
  ];

  async function handleLogout() {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              // TODO: Implement actual logout logic here
              await new Promise(resolve => setTimeout(resolve, 1000));
              router.replace('/auth/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to log out. Please try again.');
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color={Colors.gray[800]} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={() => router.push('/settings/profile')}
            >
              <Edit2 size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Sophia Parker</Text>
          <Text style={styles.userTag}>Cocktail Enthusiast</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/settings/profile')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => router.push('/payment')}
          >
            <Text style={styles.subscribeButtonText}>Subscribe for Premium</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {userStats.map((stat) => (
            <TouchableOpacity 
              key={stat.id} 
              style={styles.statItem}
              onPress={stat.onPress}
            >
              <View style={styles.statIconContainer}>
                <stat.icon size={24} color={Colors.primary[600]} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
              disabled={isLoading}
            >
              <View style={styles.menuIconContainer}>
                <item.icon size={20} color={item.color || Colors.gray[700]} />
              </View>
              <Text style={[styles.menuItemText, item.color && { color: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  settingsButton: {
    padding: Layout.spacing.sm,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: Layout.spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary[600],
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  userName: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
  },
  userTag: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[500],
    marginBottom: Layout.spacing.lg,
  },
  editButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.xl,
    backgroundColor: Colors.primary[600],
    borderRadius: Layout.borderRadius.md,
  },
  editButtonText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.white,
  },
  subscribeButton: {
    marginTop: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.xl,
    backgroundColor: Colors.secondary[500],
    borderRadius: Layout.borderRadius.md,
  },
  subscribeButtonText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.lg,
  },
  statItem: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    alignItems: 'center',
    shadowColor: Colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  statValue: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
  },
  statTitle: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[500],
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    marginHorizontal: Layout.spacing.lg,
    marginVertical: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    marginBottom: Layout.spacing.xxl,
    shadowColor: Colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
});