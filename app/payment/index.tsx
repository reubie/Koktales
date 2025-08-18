import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import Header from '@/components/Header';
import { CreditCard, Smartphone, Shield, Check } from 'lucide-react-native';
import { cocktails } from '@/constants/Cocktails';
import { initializeStripe, processStripePayment, processMpesaPayment } from '@/services/PaymentService';
import MpesaPhoneInput from '@/components/MpesaPhoneInput';

type PaymentMethod = 'stripe' | 'mpesa';

const subscriptionPlans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 9.99,
    description: 'Access to all premium cocktails',
    features: [
      'Unlimited premium cocktails',
      'New cocktails every week',
      'Save favorite cocktails',
      'Detailed instructions and tips'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 99.99,
    description: 'Save 17% with annual billing',
    features: [
      'All monthly plan features',
      'Priority customer support',
      'Early access to new features',
      'Exclusive seasonal recipes'
    ]
  }
];

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('stripe');
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // If cocktailId is provided, it means we're buying a single cocktail
  const cocktail = params.cocktailId ? 
    cocktails.find(c => c.id === params.cocktailId) : null;

  useEffect(() => {
    initializeStripe().catch(console.error);
  }, []);

  const handlePayment = async () => {
    if (isProcessing) return;

    const price = cocktail?.price ?? selectedPlan.price;
    if (typeof price !== 'number') {
      Alert.alert('Error', 'Invalid price');
      return;
    }

    const item = {
      id: cocktail ? cocktail.id : selectedPlan.id,
      name: cocktail ? cocktail.name : selectedPlan.name,
      price,
    };

    if (selectedPaymentMethod === 'stripe') {
      await handleStripePayment(item);
    } else if (selectedPaymentMethod === 'mpesa') {
      setShowMpesaModal(true);
    }
  };

  const handleStripePayment = async (item: { id: string; name: string; price: number }) => {
    setIsProcessing(true);
    try {
      const result = await processStripePayment(item);
      if (result.success) {
        Alert.alert('Success', result.message, [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMpesaPayment = async (phoneNumber: string) => {
    setShowMpesaModal(false);
    setIsProcessing(true);

    const price = cocktail?.price ?? selectedPlan.price;
    if (typeof price !== 'number') {
      Alert.alert('Error', 'Invalid price');
      setIsProcessing(false);
      return;
    }

    const item = {
      id: cocktail ? cocktail.id : selectedPlan.id,
      name: cocktail ? cocktail.name : selectedPlan.name,
      price,
    };

    try {
      const result = await processMpesaPayment(item, phoneNumber);
      if (result.success) {
        Alert.alert('Success', result.message, [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={cocktail ? 'Buy Cocktail' : 'Choose Plan'} 
        showNotification={false}
      />
      
      <ScrollView style={styles.content}>
        {cocktail ? (
          // Single cocktail purchase
          <View style={styles.cocktailCard}>
            <Image source={{ uri: cocktail.image }} style={styles.cocktailImage} />
            <View style={styles.cocktailInfo}>
              <Text style={styles.cocktailName}>{cocktail.name}</Text>
              <Text style={styles.cocktailPrice}>${cocktail.price}</Text>
            </View>
          </View>
        ) : (
          // Subscription plans
          <View style={styles.plansContainer}>
            {subscriptionPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan.id === plan.id && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan(plan)}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planPrice}>
                    ${plan.price}
                    <Text style={styles.planPeriod}>
                      {plan.id === 'monthly' ? '/month' : '/year'}
                    </Text>
                  </Text>
                </View>
                <Text style={styles.planDescription}>{plan.description}</Text>
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Check size={16} color={Colors.secondary[500]} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.paymentMethodsContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === 'stripe' && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedPaymentMethod('stripe')}
          >
            <CreditCard size={24} color={Colors.gray[700]} />
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodTitle}>Credit Card</Text>
              <Text style={styles.paymentMethodDescription}>Pay with Visa, Mastercard, or AMEX</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === 'mpesa' && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedPaymentMethod('mpesa')}
          >
            <Smartphone size={24} color={Colors.gray[700]} />
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodTitle}>M-Pesa</Text>
              <Text style={styles.paymentMethodDescription}>Pay using M-Pesa mobile money</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.securePaymentNote}>
          <Shield size={16} color={Colors.gray[500]} />
          <Text style={styles.securePaymentText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Processing...' : `Pay $${cocktail ? cocktail.price : selectedPlan.price}`}
          </Text>
        </TouchableOpacity>
      </View>

      <MpesaPhoneInput
        visible={showMpesaModal}
        onClose={() => setShowMpesaModal(false)}
        onSubmit={handleMpesaPayment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  cocktailCard: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.xl,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cocktailImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cocktailInfo: {
    padding: Layout.spacing.lg,
  },
  cocktailName: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
  },
  cocktailPrice: {
    ...Fonts.heading,
    fontSize: 32,
    color: Colors.primary[600],
  },
  plansContainer: {
    marginBottom: Layout.spacing.xl,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  selectedPlan: {
    borderColor: Colors.primary[600],
  },
  planHeader: {
    marginBottom: Layout.spacing.md,
  },
  planName: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
  },
  planPrice: {
    ...Fonts.heading,
    fontSize: 32,
    color: Colors.primary[600],
  },
  planPeriod: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[500],
  },
  planDescription: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.md,
  },
  featuresContainer: {
    marginTop: Layout.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  featureText: {
    ...Fonts.body,
    color: Colors.gray[700],
    marginLeft: Layout.spacing.sm,
  },
  paymentMethodsContainer: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.md,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  selectedPaymentMethod: {
    borderColor: Colors.primary[600],
  },
  paymentMethodInfo: {
    marginLeft: Layout.spacing.md,
  },
  paymentMethodTitle: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  paymentMethodDescription: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[500],
  },
  securePaymentNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  securePaymentText: {
    ...Fonts.caption,
    color: Colors.gray[500],
    marginLeft: Layout.spacing.xs,
  },
  footer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  payButton: {
    backgroundColor: Colors.primary[600],
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: Colors.gray[400],
  },
  payButtonText: {
    ...Fonts.button,
    color: Colors.white,
    fontSize: 16,
  },
}); 