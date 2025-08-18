import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Glasses as Glass, FileLock as Cocktail, Compass } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Discover Cocktails',
    description: 'Explore hundreds of cocktail recipes from classics to new creations.',
    image: 'https://images.pexels.com/photos/613037/pexels-photo-613037.jpeg',
    icon: (props: any) => <Cocktail {...props} />
  },
  {
    id: '2',
    title: 'Find Your Perfect Mix',
    description: 'Filter by ingredients, difficulty, and preferences to find your ideal drink.',
    image: 'https://images.pexels.com/photos/5947024/pexels-photo-5947024.jpeg',
    icon: (props: any) => <Compass {...props} />
  },
  {
    id: '3',
    title: 'Mix Like a Pro',
    description: 'Follow step-by-step instructions to create perfect cocktails every time.',
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
    icon: (props: any) => <Glass {...props} />
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay} />
        <View style={styles.iconContainer}>
          <item.icon size={52} color={Colors.white} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.footer}>
        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[800],
  },
  slide: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(75, 29, 149, 0.7)', // purple-900 with opacity
  },
  iconContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  textContainer: {
    paddingHorizontal: Layout.spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...Fonts.heading,
    fontSize: 28,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  description: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.spacing.xl,
    paddingBottom: Layout.spacing.xxl,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray[400],
    marginHorizontal: Layout.spacing.xs,
  },
  activeIndicator: {
    width: 20,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: Layout.spacing.md,
  },
  skipButtonText: {
    ...Fonts.button,
    color: Colors.white,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: Colors.secondary[500],
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    borderRadius: Layout.borderRadius.md,
  },
  nextButtonText: {
    ...Fonts.button,
    color: Colors.white,
    fontSize: 16,
  },
});