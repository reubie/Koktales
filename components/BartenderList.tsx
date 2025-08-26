import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { User, MapPin } from 'lucide-react-native';

export default function BartenderList() {
  const bartenders = [
    { id: '1', name: 'Adam White', location: 'Florida, USA', experience: '5 years' },
    { id: '2', name: 'Samanta Green', location: 'Paris, France', experience: '3 years' },
    { id: '3', name: 'Mike Johnson', location: 'New York, USA', experience: '7 years' },
  ];

  const handleBartenderPress = (id: string) => {
    router.push(`/discover/bartender/${id}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {bartenders.map((bartender) => (
        <TouchableOpacity
          key={bartender.id}
          style={styles.bartenderCard}
          onPress={() => handleBartenderPress(bartender.id)}
        >
          <View style={styles.avatar}>
            <User size={24} color={Colors.primary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{bartender.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.typography.secondary} />
              <Text style={styles.location}>{bartender.location}</Text>
            </View>
            <Text style={styles.experience}>{bartender.experience} experience</Text>
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
  bartenderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.entryField,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...Fonts.headline3,
    color: Colors.typography.primary,
    marginBottom: Layout.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  location: {
    ...Fonts.body3,
    color: Colors.typography.secondary,
    marginLeft: Layout.spacing.xs,
  },
  experience: {
    ...Fonts.body3,
    color: Colors.primary,
    fontSize: 12,
  },
});