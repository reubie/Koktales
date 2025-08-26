import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, User, MapPin, Send, Heart } from 'lucide-react-native';

export default function BartenderProfileScreen() {
  const { id } = useLocalSearchParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.typography.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={40} color={Colors.primary} />
          </View>
          
          <Text style={styles.name}>Adam White</Text>
          <Text style={styles.bio}>Mixologist at White Wolf Bar</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.typography.secondary} />
            <Text style={styles.location}>Florida, USA</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>144</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>9</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Heart size={16} color={isFollowing ? Colors.typography.primary : Colors.primary} />
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageButton}>
              <Send size={20} color={Colors.typography.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Passionate mixologist with 5 years of experience crafting unique cocktails. 
            Specializes in classic recipes with modern twists.
          </Text>
        </View>
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
    paddingTop: Layout.spacing.triple,
    paddingHorizontal: Layout.spacing.double,
    paddingBottom: Layout.spacing.md,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Layout.spacing.quadruple,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  name: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  bio: {
    ...Fonts.body2,
    color: Colors.typography.secondary,
    marginBottom: Layout.spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.double,
  },
  location: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    marginLeft: Layout.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Layout.spacing.double,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Fonts.headline3,
    color: Colors.primary,
    marginBottom: Layout.spacing.xs,
  },
  statLabel: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.double,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.full,
    gap: Layout.spacing.xs,
  },
  followingButton: {
    backgroundColor: Colors.surface,
  },
  followButtonText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 14,
  },
  followingButtonText: {
    color: Colors.typography.primary,
  },
  messageButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    marginBottom: Layout.spacing.quadruple,
  },
  sectionTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.md,
  },
  aboutText: {
    ...Fonts.body1,
    color: Colors.typography.primary,
    lineHeight: 24,
  },
});