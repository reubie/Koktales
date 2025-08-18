import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Lock, Crown, X } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Cocktail } from '@/constants/Cocktails';

type UnlockModalProps = {
  visible: boolean;
  onClose: () => void;
  cocktail: Cocktail;
};

export default function UnlockModal({ visible, onClose, cocktail }: UnlockModalProps) {
  const handleUnlockCocktail = () => {
    router.push({
      pathname: '/payment',
      params: { cocktailId: cocktail.id }
    });
    onClose();
  };

  const handleSubscribe = () => {
    router.push('/payment');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <X size={24} color={Colors.gray[600]} />
          </TouchableOpacity>

          <Image source={{ uri: cocktail.image }} style={styles.image} />
          
          <Text style={styles.title}>Unlock {cocktail.name}</Text>
          <Text style={styles.description}>
            Get access to this premium cocktail recipe and start mixing!
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.option}
              onPress={handleUnlockCocktail}
            >
              <Lock size={24} color={Colors.primary[600]} />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Unlock This Recipe</Text>
                <Text style={styles.optionPrice}>${cocktail.price}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.option, styles.subscribeOption]}
              onPress={handleSubscribe}
            >
              <Crown size={24} color={Colors.secondary[500]} />
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, styles.subscribeTitle]}>
                  Subscribe for Unlimited Access
                </Text>
                <Text style={[styles.optionPrice, styles.subscribePrice]}>
                  $9.99/month
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.benefitsTitle}>Subscription Benefits:</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Access to all premium cocktails</Text>
            <Text style={styles.benefitItem}>• New recipes every week</Text>
            <Text style={styles.benefitItem}>• Exclusive seasonal collections</Text>
            <Text style={styles.benefitItem}>• Save favorite cocktails</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    width: '100%',
    maxWidth: 400,
    padding: Layout.spacing.xl,
  },
  closeButton: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
    textAlign: 'center',
  },
  description: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: Layout.spacing.xl,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.lg,
    backgroundColor: Colors.gray[50],
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  subscribeOption: {
    backgroundColor: Colors.secondary[50],
  },
  optionTextContainer: {
    marginLeft: Layout.spacing.md,
    flex: 1,
  },
  optionTitle: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  subscribeTitle: {
    color: Colors.secondary[700],
  },
  optionPrice: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.primary[600],
  },
  subscribePrice: {
    color: Colors.secondary[600],
  },
  benefitsTitle: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.sm,
  },
  benefitsList: {
    marginBottom: Layout.spacing.md,
  },
  benefitItem: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.xs,
  },
}); 