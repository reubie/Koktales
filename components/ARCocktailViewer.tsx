import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Camera, Box, RotateCcw } from 'lucide-react-native';

type CocktailModel = {
  id: string;
  name: string;
  modelUrl: string;
  thumbnail: string;
};

export default function ARCocktailViewer() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState<CocktailModel | null>(null);

  const handleStartAR = () => {
    // TODO: Implement actual AR functionality
    setIsARActive(true);
  };

  const handleResetView = () => {
    // TODO: Reset AR view
  };

  return (
    <View style={styles.container}>
      {!isARActive ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg' }}
            style={styles.previewImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>View in AR</Text>
            <Text style={styles.subtitle}>
              See how your cocktail will look in real life
            </Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStartAR}
            >
              <Camera size={24} color={Colors.white} />
              <Text style={styles.startButtonText}>Start AR View</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.arContainer}>
          <View style={styles.arControls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleResetView}
            >
              <RotateCcw size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => setIsARActive(false)}
            >
              <Box size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.arPlaceholder}>
            <Text style={styles.arPlaceholderText}>
              AR View will be implemented here
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  title: {
    ...Fonts.heading,
    fontSize: 32,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary[500],
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.md,
  },
  startButtonText: {
    ...Fonts.button,
    color: Colors.white,
    fontSize: 16,
    marginLeft: Layout.spacing.sm,
  },
  arContainer: {
    flex: 1,
    position: 'relative',
  },
  arControls: {
    position: 'absolute',
    top: Layout.spacing.xl,
    right: Layout.spacing.xl,
    zIndex: 1,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  arPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[900],
  },
  arPlaceholderText: {
    ...Fonts.body,
    color: Colors.gray[400],
    fontSize: 16,
  },
}); 