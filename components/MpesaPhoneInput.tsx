import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { validatePhoneNumber } from '@/services/PaymentService';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
};

export default function MpesaPhoneInput({ visible, onClose, onSubmit }: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!phoneNumber) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    onSubmit(phoneNumber);
    setPhoneNumber('');
    setError('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Enter M-Pesa Phone Number</Text>
          <Text style={styles.description}>
            Please enter the phone number registered with M-Pesa to receive the payment request.
          </Text>

          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setError('');
            }}
            placeholder="e.g., +254712345678"
            keyboardType="phone-pad"
            autoFocus
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: Layout.spacing.lg,
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.xl,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    fontSize: 16,
    marginBottom: Layout.spacing.sm,
  },
  errorText: {
    ...Fonts.caption,
    color: Colors.error[500],
    marginBottom: Layout.spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.lg,
  },
  button: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.gray[100],
    marginRight: Layout.spacing.sm,
  },
  submitButton: {
    backgroundColor: Colors.primary[600],
    marginLeft: Layout.spacing.sm,
  },
  cancelButtonText: {
    ...Fonts.button,
    color: Colors.gray[700],
  },
  submitButtonText: {
    ...Fonts.button,
    color: Colors.white,
  },
}); 