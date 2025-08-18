import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  HelpCircle, 
  Info, 
  Shield, 
  LogOut 
} from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          icon: User,
          onPress: () => router.push('/settings/profile'),
        },
        {
          id: 'notifications',
          title: 'Notifications',
          icon: Bell,
          onPress: () => router.push('/settings/notifications'),
        },
        {
          id: 'privacy',
          title: 'Privacy & Security',
          icon: Lock,
          onPress: () => router.push('/settings/privacy'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'language',
          title: 'Language',
          icon: Globe,
          onPress: () => router.push('/settings/language'),
        },
        {
          id: 'units',
          title: 'Measurement Units',
          icon: Globe,
          onPress: () => router.push('/settings/units'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          icon: HelpCircle,
          onPress: () => router.push('/settings/help'),
        },
        {
          id: 'about',
          title: 'About App',
          icon: Info,
          onPress: () => router.push('/settings/about'),
        },
        {
          id: 'terms',
          title: 'Terms & Privacy',
          icon: Shield,
          onPress: () => router.push('/settings/terms'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuIconContainer}>
                    <item.icon size={20} color={Colors.gray[700]} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push('/auth/login')}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    ...Fonts.heading,
    fontSize: 16,
    color: Colors.gray[500],
    marginBottom: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
  },
  sectionContent: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    marginHorizontal: Layout.spacing.lg,
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xxl,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    shadowColor: Colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.error,
    marginLeft: Layout.spacing.sm,
  },
}); 