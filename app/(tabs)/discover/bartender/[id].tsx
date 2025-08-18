import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, MapPin, Send } from 'lucide-react-native';

export default function BartenderProfileScreen() {
  const { id } = useLocalSearchParams();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }}
            style={styles.profileImage}
          />
          
          <Text style={styles.name}>Adam White</Text>
          <Text style={styles.bio}>Mixologist at White Wolf bar</Text>
          <Text style={styles.location}>
            <MapPin size={16} color={Colors.gray[400]} /> Florida, USA
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>144</Text>
              <Text style={styles.statLabel}>followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>9</Text>
              <Text style={styles.statLabel}>following</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, isFollowing && styles.followingButton]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text style={[styles.buttonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageButton}>
              <Send size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          {/* Add tabs for Recipes, About, etc. */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: Layout.spacing.lg,
    left: Layout.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: Layout.spacing.lg,
  },
  name: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.white,
    marginBottom: Layout.spacing.xs,
  },
  bio: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    marginBottom: Layout.spacing.xs,
  },
  location: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
    marginBottom: Layout.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.white,
  },
  statLabel: {
    ...Fonts.caption,
    fontSize: 14,
    color: Colors.gray[400],
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.secondary[500],
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.md,
  },
  followingButton: {
    backgroundColor: Colors.gray[800],
  },
  buttonText: {
    ...Fonts.button,
    color: Colors.white,
    fontSize: 16,
  },
  followingButtonText: {
    color: Colors.gray[400],
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flex: 1,
  },
});