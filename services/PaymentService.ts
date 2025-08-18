import { initStripe, presentPaymentSheet } from '@stripe/stripe-react-native';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'YOUR_STRIPE_PUBLISHABLE_KEY';

// Initialize Stripe
export const initializeStripe = async () => {
  await initStripe({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
};

type PaymentItem = {
  id: string;
  name: string;
  price: number;
};

export const processStripePayment = async (item: PaymentItem) => {
  try {
    // In a real app, you would make an API call to your backend to create a payment intent
    // The backend would then return the client secret
    // For demo purposes, we're just showing the flow
    const clientSecret = 'DUMMY_CLIENT_SECRET';

    const { error } = await presentPaymentSheet({
      clientSecret,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: 'Payment successful!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

export const processMpesaPayment = async (item: PaymentItem, phoneNumber: string) => {
  try {
    // In a real app, you would make an API call to your M-Pesa integration backend
    // The backend would initiate the STK push to the provided phone number
    // For demo purposes, we're just showing the flow
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'M-Pesa payment initiated. Please check your phone.',
        });
      }, 2000);
    });

    return response as { success: boolean; message: string };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Basic validation for Kenyan phone numbers
  const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
  return phoneRegex.test(phoneNumber);
}; 