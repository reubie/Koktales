import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { Menu, Bell, ArrowLeft } from 'lucide-react-native';

type HeaderProps = {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onBackPress?: () => void;
};

export default function Header({
  title,
  subtitle,
  showNotification = true,
  onMenuPress,
  onNotificationPress,
  onBackPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
      )}
      {onMenuPress && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Menu size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {showNotification && onNotificationPress && (
        <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
          <Bell size={24} color={Colors.gray[800]} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  menuButton: {
    padding: Layout.spacing.sm,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...Fonts.heading,
    fontSize: 18,
    color: Colors.gray[800],
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[500],
    marginTop: 2,
  },
  notificationButton: {
    padding: Layout.spacing.sm,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary[500],
  },
});