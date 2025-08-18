import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

export default function VerifyAgeScreen() {
  const handleVerify = () => {
    router.push('/auth/signup');
  };

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
      <Image
        source={{ uri: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Before we start are you older than 18 y.o?</Text>
        
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>I have already 18 years old</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleContinueWithGoogle}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleContinueWithApple}>
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleContinueWithoutAuth}>
          <Text style={styles.skipButtonText}>Continue w/o authorize</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing you agree to our Terms and Privacy Policy
        </Text>
      </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Layout.spacing.xl,
    paddingBottom: Layout.spacing.xxl,
  },
  title: {
    ...Fonts.heading,
    fontSize: 32,
    color: Colors.white,
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: Colors.secondary[500],
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  verifyButtonText: {
    ...Fonts.button,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
  socialButton: {
    backgroundColor: Colors.white,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  socialButtonText: {
    ...Fonts.button,
    color: Colors.gray[800],
    textAlign: 'center',
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
  skipButtonText: {
    ...Fonts.button,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  loginText: {
    ...Fonts.body,
    color: Colors.gray[400],
    fontSize: 14,
  },
  loginLink: {
    ...Fonts.button,
    color: Colors.secondary[500],
    fontSize: 14,
  },
  termsText: {
    ...Fonts.caption,
    color: Colors.gray[400],
    textAlign: 'center',
    fontSize: 12,
  },
});