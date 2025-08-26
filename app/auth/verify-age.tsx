import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

export default function VerifyAgeScreen() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  const handleContinueWithGoogle = () => {
    router.push('/subscription');
  };

  const handleContinueWithApple = () => {
    router.push('/subscription');
  };

  const handleContinueWithoutAuth = () => {
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header with time and status icons */}
      <View style={styles.header}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon} />
        </View>
      </View>

      <Image
        source={{ uri: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Before we start are you older than 18 y.o?</Text>
        
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setIsAgeVerified(!isAgeVerified)}
        >
          <View style={[styles.checkbox, isAgeVerified && styles.checkboxChecked]}>
            {isAgeVerified && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>I have already 18 years old</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleContinueWithGoogle}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleContinueWithApple}>
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleContinueWithoutAuth}>
          <Text style={styles.primaryButtonText}>Continue w/o authorize</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 14, 14, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Layout.spacing.double,
    paddingBottom: Layout.spacing.quadruple,
  },
  title: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.double,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.double,
    paddingHorizontal: Layout.spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.typography.primary,
    marginRight: Layout.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  checkmark: {
    color: Colors.typography.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
  },
  socialButton: {
    backgroundColor: Colors.typography.primary,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  socialButtonText: {
    ...Fonts.button,
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.double,
  },
  primaryButtonText: {
    ...Fonts.button,
    color: Colors.typography.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.double,
  },
  loginText: {
    ...Fonts.body3,
    color: Colors.typography.primary,
    fontSize: 13,
  },
  loginLink: {
    ...Fonts.body4,
    color: Colors.primary,
    fontSize: 13,
  },
  termsText: {
    ...Fonts.body5,
    color: Colors.typography.primary,
    textAlign: 'center',
    fontSize: 10,
    opacity: 0.8,
  },
});