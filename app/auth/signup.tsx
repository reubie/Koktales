import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft } from 'lucide-react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay} />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={Colors.white} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our cocktail community</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={Colors.gray[400]}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.gray[400]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.gray[400]}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.gray[400]}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => router.push('/subscription')}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: Layout.spacing.lg,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    ...Fonts.heading,
    fontSize: 32,
    color: Colors.white,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    marginBottom: Layout.spacing.xl,
  },
  form: {
    width: '100%',
  },
  input: {
    ...Fonts.body,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: Colors.secondary[500],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  signupButtonText: {
    ...Fonts.button,
    color: Colors.white,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray[700],
  },
  dividerText: {
    ...Fonts.body,
    color: Colors.gray[400],
    marginHorizontal: Layout.spacing.md,
  },
  socialButton: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  socialButtonText: {
    ...Fonts.button,
    color: Colors.gray[800],
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
  },
  footerText: {
    ...Fonts.body,
    color: Colors.gray[400],
    fontSize: 14,
  },
  footerLink: {
    ...Fonts.button,
    color: Colors.secondary[500],
    fontSize: 14,
  },
});