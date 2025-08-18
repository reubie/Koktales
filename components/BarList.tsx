import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { MapPin, Clock, Star } from 'lucide-react-native';

type Bar = {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  hours: string;
  distance: string;
};

const bars: Bar[] = [
  {
    id: '1',
    name: 'White Wolf Bar',
    image: 'https://images.pexels.com/photos/2282153/pexels-photo-2282153.jpeg',
    location: 'Florida, USA',
    rating: 4.8,
    hours: '5 PM - 2 AM',
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'Martian Martini Club',
    image: 'https://images.pexels.com/photos/1322184/pexels-photo-1322184.jpeg',
    location: 'New York, USA',
    rating: 4.5,
    hours: '6 PM - 3 AM',
    distance: '2.5 km',
  },
  // Add more bars
];

export default function BarList() {
  const renderItem = ({ item }: { item: Bar }) => (
    <TouchableOpacity style={styles.barCard}>
      <Image source={{ uri: item.image }} style={styles.barImage} />
      <View style={styles.barInfo}>
        <View style={styles.barHeader}>
          <Text style={styles.barName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.secondary[500]} fill={Colors.secondary[500]} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.gray[400]} />
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.distanceText}>• {item.distance}</Text>
        </View>
        
        <View style={styles.hoursContainer}>
          <Clock size={14} color={Colors.gray[400]} />
          <Text style={styles.hoursText}>{item.hours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bars}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.lg,
  },
  barCard: {
    backgroundColor: Colors.gray[900],
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    overflow: 'hidden',
  },
  barImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  barInfo: {
    padding: Layout.spacing.md,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  barName: {
    ...Fonts.subheading,
    fontSize: 18,
    color: Colors.white,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.white,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    ...Fonts.caption,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: 4,
  },
  distanceText: {
    ...Fonts.caption,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: 4,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    ...Fonts.caption,
    fontSize: 14,
    color: Colors.gray[400],
    marginLeft: 4,
  },
});