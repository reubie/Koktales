import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { MapPin } from 'lucide-react-native';

type Bartender = {
  id: string;
  name: string;
  image: string;
  location: string;
  bar: string;
  experience: string;
};

const bartenders: Bartender[] = [
  {
    id: '1',
    name: 'Adam White',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    location: 'Florida, USA',
    bar: 'White Wolf bar',
    experience: '5 years',
  },
  {
    id: '2',
    name: 'Samanta Green',
    image: 'https://images.pexels.com/photos/3214779/pexels-photo-3214779.jpeg',
    location: 'Paris, France',
    bar: 'White Wolf bar',
    experience: '3 years',
  },
  // Add more bartenders
];

export default function BartenderList() {
  const renderItem = ({ item }: { item: Bartender }) => (
    <TouchableOpacity 
      style={styles.bartenderCard}
      onPress={() => router.push(`/discover/bartender/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.bartenderImage} />
      <View style={styles.bartenderInfo}>
        <Text style={styles.bartenderName}>{item.name}</Text>
        <Text style={styles.bartenderBar}>{item.bar}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.gray[400]} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.experienceText}>{item.experience} of exp</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bartenders}
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
  bartenderCard: {
    flexDirection: 'row',
    backgroundColor: Colors.gray[900],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  bartenderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Layout.spacing.md,
  },
  bartenderInfo: {
    flex: 1,
  },
  bartenderName: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.white,
    marginBottom: 2,
  },
  bartenderBar: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[400],
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    ...Fonts.caption,
    fontSize: 12,
    color: Colors.gray[400],
    marginLeft: 4,
  },
  experienceText: {
    ...Fonts.caption,
    fontSize: 12,
    color: Colors.gray[500],
  },
});