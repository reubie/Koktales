import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  TrendingUp, 
  Award,
  Star
} from 'lucide-react-native';

type Post = {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  isCompleted: boolean;
};

export default function CommunityFeatures() {
  const [selectedTab, setSelectedTab] = useState<'feed' | 'achievements' | 'leaderboard'>('feed');

  const posts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Mixologist',
        avatar: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
        isVerified: true,
      },
      content: 'Just created this amazing summer cocktail! Perfect for hot days 🍹 #SummerVibes',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
      likes: 245,
      comments: 32,
      shares: 12,
      timestamp: '2h ago',
      isLiked: false,
    },
    // Add more posts as needed
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Mix Master',
      description: 'Create 50 different cocktails',
      icon: '🍹',
      progress: 75,
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Share 10 recipes with the community',
      icon: '🦋',
      progress: 100,
      isCompleted: true,
    },
    // Add more achievements as needed
  ];

  const renderFeed = () => (
    <ScrollView style={styles.feedContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>{post.user.name}</Text>
                {post.user.isVerified && (
                  <Award size={16} color={Colors.secondary[500]} />
                )}
              </View>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart 
                size={20} 
                color={post.isLiked ? Colors.error : Colors.gray[400]} 
                fill={post.isLiked ? Colors.error : 'none'}
              />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color={Colors.gray[400]} />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color={Colors.gray[400]} />
              <Text style={styles.actionText}>{post.shares}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderAchievements = () => (
    <ScrollView style={styles.achievementsContainer}>
      {achievements.map((achievement) => (
        <View key={achievement.id} style={styles.achievementCard}>
          <View style={styles.achievementHeader}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            {achievement.isCompleted && (
              <Star size={24} color={Colors.secondary[500]} fill={Colors.secondary[500]} />
            )}
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${achievement.progress}%` },
                achievement.isCompleted && styles.progressComplete,
              ]} 
            />
          </View>
          
          <Text style={styles.progressText}>
            {achievement.progress}% Complete
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderLeaderboard = () => (
    <ScrollView style={styles.leaderboardContainer}>
      <View style={styles.leaderboardCard}>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardTitle}>Top Mixologists</Text>
          <Text style={styles.leaderboardPeriod}>This Month</Text>
        </View>
        
        <View style={styles.leaderboardList}>
          {[1, 2, 3].map((position) => (
            <View key={position} style={styles.leaderboardItem}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>#{position}</Text>
              </View>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg' }} 
                style={styles.leaderAvatar} 
              />
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>Mixologist {position}</Text>
                <Text style={styles.leaderScore}>{1000 - position * 100} points</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'feed' && styles.tabActive]}
          onPress={() => setSelectedTab('feed')}
        >
          <Users size={20} color={selectedTab === 'feed' ? Colors.white : Colors.gray[400]} />
          <Text style={[styles.tabText, selectedTab === 'feed' && styles.tabTextActive]}>
            Feed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Award size={20} color={selectedTab === 'achievements' ? Colors.white : Colors.gray[400]} />
          <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>
            Achievements
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'leaderboard' && styles.tabActive]}
          onPress={() => setSelectedTab('leaderboard')}
        >
          <TrendingUp size={20} color={selectedTab === 'leaderboard' ? Colors.white : Colors.gray[400]} />
          <Text style={[styles.tabText, selectedTab === 'leaderboard' && styles.tabTextActive]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'feed' && renderFeed()}
      {selectedTab === 'achievements' && renderAchievements()}
      {selectedTab === 'leaderboard' && renderLeaderboard()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  tabs: {
    flexDirection: 'row',
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[800],
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.sm,
    marginHorizontal: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.md,
  },
  tabActive: {
    backgroundColor: Colors.secondary[500],
  },
  tabText: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: Layout.spacing.xs,
  },
  tabTextActive: {
    color: Colors.white,
  },
  feedContainer: {
    flex: 1,
  },
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: Layout.spacing.lg,
    marginVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
    marginRight: Layout.spacing.xs,
  },
  timestamp: {
    ...Fonts.caption,
    fontSize: 12,
    color: Colors.gray[400],
  },
  postContent: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.gray[800],
    paddingTop: Layout.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: Layout.spacing.xs,
  },
  achievementsContainer: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: Layout.spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
    marginBottom: Layout.spacing.xs,
  },
  achievementDescription: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.gray[800],
    borderRadius: 2,
    marginBottom: Layout.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary[500],
    borderRadius: 2,
  },
  progressComplete: {
    backgroundColor: Colors.success,
  },
  progressText: {
    ...Fonts.caption,
    fontSize: 12,
    color: Colors.gray[400],
    textAlign: 'right',
  },
  leaderboardContainer: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  leaderboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
  },
  leaderboardHeader: {
    marginBottom: Layout.spacing.lg,
  },
  leaderboardTitle: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.white,
    marginBottom: Layout.spacing.xs,
  },
  leaderboardPeriod: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
  },
  leaderboardList: {
    marginTop: Layout.spacing.md,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[800],
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  rankText: {
    ...Fonts.heading,
    fontSize: 16,
    color: Colors.white,
  },
  leaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.md,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
    marginBottom: Layout.spacing.xs,
  },
  leaderScore: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
  },
}); 