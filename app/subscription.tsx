import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

export default function SubscriptionScreen() {
  const handleSubscribe = () => {
    // Handle subscription logic
    router.push('/(tabs)');
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Unlock Premium</Text>
        <Text style={styles.subtitle}>Get access to all cocktail recipes and features</Text>

        <View style={styles.features}>
          <Text style={styles.featureText}>✓ Unlimited cocktail recipes</Text>
          <Text style={styles.featureText}>✓ Premium ingredients</Text>
          <Text style={styles.featureText}>✓ Advanced techniques</Text>
          <Text style={styles.featureText}>✓ No ads</Text>
        </View>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Layout.spacing.triple,
    paddingHorizontal: Layout.spacing.double,
    zIndex: 1,
  },
  timeText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  wifiIcon: {
    width: 16,
    height: 12,
    backgroundColor: Colors.typography.primary,
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    backgroundColor: Colors.typography.primary,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.double,
  },
  title: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body1,
    color: Colors.typography.secondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.quadruple,
  },
  features: {
    marginBottom: Layout.spacing.quadruple,
    gap: Layout.spacing.md,
  },
  featureText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  subscribeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  subscribeButtonText: {
    ...Fonts.button,
    color: Colors.typography.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: Layout.spacing.md,
  },
  skipButtonText: {
    ...Fonts.body3,
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 13,
  },
});