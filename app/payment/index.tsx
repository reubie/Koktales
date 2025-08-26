import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react-native';

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handlePayment = () => {
    // Handle payment logic
    router.push('/(tabs)');
  };

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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.securityNote}>
          <Lock size={16} color={Colors.primary} />
          <Text style={styles.securityText}>Your payment information is secure</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.cardInputContainer}>
              <CreditCard size={20} color={Colors.typography.secondary} />
              <TextInput
                style={styles.cardInput}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={Colors.typography.secondary}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor={Colors.typography.secondary}
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor={Colors.typography.secondary}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={Colors.typography.secondary}
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="words"
            />
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Pay $9.99</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By completing this payment, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
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
    paddingBottom: Layout.spacing.md,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerTitle: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.quadruple,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
  },
  securityText: {
    ...Fonts.body3,
    color: Colors.typography.primary,
    fontSize: 13,
  },
  form: {
    gap: Layout.spacing.double,
  },
  inputGroup: {
    gap: Layout.spacing.sm,
  },
  label: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 14,
  },
  cardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.entryField,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardInput: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    color: Colors.typography.primary,
    fontSize: 16,
    marginLeft: Layout.spacing.sm,
  },
  input: {
    backgroundColor: Colors.entryField,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    color: Colors.typography.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.md,
  },
  payButtonText: {
    ...Fonts.button,
    color: Colors.typography.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  termsText: {
    ...Fonts.body5,
    color: Colors.typography.secondary,
    textAlign: 'center',
    fontSize: 10,
    opacity: 0.8,
  },
}); 