import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Explore new cocktail recipes',
    image: 'https://images.pexels.com/photos/613037/pexels-photo-613037.jpeg',
  },
  {
    id: '2',
    title: 'Know cocktails as a new art',
    image: 'https://images.pexels.com/photos/5947024/pexels-photo-5947024.jpeg',
  },
  {
    id: '3',
    title: 'Share your favorite cocktail recipes',
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
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
        
        {/* Header with time and skip button */}
        <View style={styles.header}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <View style={styles.wifiIcon} />
            <View style={styles.batteryIcon} />
          </View>
          <TouchableOpacity onPress={() => router.push('/auth/verify-age')} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          
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
      router.push('/auth/verify-age');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slide: {
    width,
    height: '100%',
    justifyContent: 'space-between',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 14, 14, 0.3)',
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
  skipButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
  },
  skipButtonText: {
    ...Fonts.body2,
    color: Colors.typography.primary,
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.double,
  },
  title: {
    ...Fonts.headline2,
    color: Colors.typography.primary,
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  footer: {
    paddingHorizontal: Layout.spacing.double,
    paddingBottom: Layout.spacing.quadruple,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.quadruple,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.double,
    minWidth: 120,
  },
  nextButtonText: {
    ...Fonts.button,
    color: Colors.typography.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Layout.spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.typography.secondary,
  },
  activeIndicator: {
    backgroundColor: Colors.typography.primary,
  },
});