import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { User, Settings, Heart, BookOpen, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  // Simplified to avoid potential crashes
  const handleLogout = () => {
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <User size={32} color={Colors.typography.primary} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <User size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Settings size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Heart size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>My Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <BookOpen size={20} color={Colors.primary} />
            </View>
            <Text style={styles.menuText}>My Recipes</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
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
    paddingHorizontal: Layout.spacing.double,
    paddingVertical: Layout.spacing.double,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  email: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.typography.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  section: {
    marginTop: Layout.spacing.double,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.entryField,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  menuText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.typography.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.quadruple,
    marginBottom: Layout.spacing.double,
  },
  logoutText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.error,
    marginLeft: Layout.spacing.sm,
  },
});