import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ArrowLeft, User, Camera } from 'lucide-react-native';

export default function SettingsProfileScreen() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Cocktail enthusiast');

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Handle save logic
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <User size={32} color={Colors.typography.primary} />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={Colors.typography.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={Colors.typography.secondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              placeholderTextColor={Colors.typography.secondary}
              multiline
              numberOfLines={3}
            />
          </View>
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
  saveButton: {
    padding: Layout.spacing.sm,
  },
  saveButtonText: {
    ...Fonts.body2,
    color: Colors.primary,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.double,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: Layout.spacing.double,
    marginBottom: Layout.spacing.quadruple,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  cameraButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
}); 