import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { MapPin, Clock, Star } from 'lucide-react-native';

export default function BarList() {
  const bars = [
    { id: '1', name: 'White Wolf Bar', location: 'Florida, USA', rating: 4.8, hours: '5 PM - 2 AM' },
    { id: '2', name: 'Martian Martini Club', location: 'New York, USA', rating: 4.5, hours: '6 PM - 3 AM' },
    { id: '3', name: 'The Mixology Lab', location: 'Los Angeles, USA', rating: 4.9, hours: '4 PM - 1 AM' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {bars.map((bar) => (
        <TouchableOpacity key={bar.id} style={styles.barCard}>
          <View style={styles.barHeader}>
            <Text style={styles.barName}>{bar.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.primary} fill={Colors.primary} />
              <Text style={styles.ratingText}>{bar.rating}</Text>
            </View>
          </View>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.typography.secondary} />
            <Text style={styles.locationText}>{bar.location}</Text>
          </View>
          
          <View style={styles.hoursContainer}>
            <Clock size={14} color={Colors.typography.secondary} />
            <Text style={styles.hoursText}>{bar.hours}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.double,
  },
  barCard: {
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  barName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: Colors.typography.primary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  ratingText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  locationText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: Colors.typography.secondary,
    marginLeft: Layout.spacing.xs,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: Colors.typography.secondary,
    marginLeft: Layout.spacing.xs,
  },
});