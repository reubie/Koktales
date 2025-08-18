import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, Check } from 'lucide-react-native';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '0',
    features: [
      'Access to 3 cocktail recipes',
      'Basic search functionality',
      'Save favorites',
      'Basic ingredient information',
      'Community access',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '9.99',
    features: [
      'Unlimited cocktail recipes',
      'Advanced search filters',
      'Save unlimited favorites',
      'Exclusive premium recipes',
      'Ad-free experience',
      'Create custom collections',
      'Access to video tutorials',
      'Ingredient substitutions',
      'Seasonal recommendations',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '19.99',
    features: [
      'All Premium features',
      'Advanced analytics',
      'Custom menu creation',
      'Bulk recipe scaling',
      'Inventory management',
      'Cost calculation tools',
      'Professional training videos',
      'Batch preparation tools',
      'Customer preference tracking',
      'Sales analytics',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'All Pro features',
      'Multi-user accounts',
      'Custom branding',
      'API access',
      'Advanced reporting',
      'Team management',
      'Priority support',
      'Custom integrations',
      'Training sessions',
      'Dedicated account manager',
    ],
  },
];

export default function SubscriptionScreen() {
  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      router.replace('/(tabs)');
    } else {
      // Handle premium subscription
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/5947024/pexels-photo-5947024.jpeg' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay} />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={Colors.white} />
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Select the perfect plan for your mixing journey</Text>

        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <View key={plan.id} style={[
              styles.planCard,
              plan.id === 'premium' && styles.premiumCard
            ]}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>$</Text>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>/month</Text>
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Check size={20} color={Colors.secondary[500]} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  plan.id === 'premium' && styles.premiumButton
                ]}
                onPress={() => handleSubscribe(plan.id)}
              >
                <Text style={styles.subscribeButtonText}>
                  {plan.id === 'free' ? 'Start Free' : 'Subscribe Now'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: Layout.spacing.lg,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.xl,
    marginTop: 100,
  },
  title: {
    ...Fonts.heading,
    fontSize: 32,
    color: Colors.white,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  plansContainer: {
    marginTop: Layout.spacing.xl,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.xl,
    marginBottom: Layout.spacing.xl,
  },
  premiumCard: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  planName: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Layout.spacing.xl,
  },
  currency: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.white,
    marginBottom: 4,
  },
  price: {
    ...Fonts.heading,
    fontSize: 48,
    color: Colors.white,
    marginHorizontal: 4,
  },
  period: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    marginBottom: 8,
  },
  featuresContainer: {
    marginBottom: Layout.spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  featureText: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.white,
    marginLeft: Layout.spacing.md,
  },
  subscribeButton: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  premiumButton: {
    backgroundColor: Colors.secondary[500],
  },
  subscribeButtonText: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.gray[800],
  },
});