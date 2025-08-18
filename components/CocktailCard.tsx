import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import Layout from '@/constants/Layout';
import { Cocktail } from '@/constants/Cocktails';
import { Clock, Heart, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSubscription } from '@/context/SubscriptionContext';
import UnlockModal from './UnlockModal';

type CocktailCardProps = {
  cocktail: Cocktail;
  horizontal?: boolean;
  showLock?: boolean;
};

export default function CocktailCard({ cocktail, horizontal = false, showLock = true }: CocktailCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { checkAccess } = useSubscription();
  const hasAccess = checkAccess(cocktail.id);

  const handlePress = () => {
    if (!showLock || hasAccess) {
      router.push(`/cocktail/${cocktail.id}`);
    } else {
      setModalVisible(true);
    }
  };

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          horizontal ? styles.horizontalContainer : null
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image source={{ uri: cocktail.image }} style={styles.image} />
        {showLock && !hasAccess && (
          <View style={styles.lockOverlay}>
            <Lock size={32} color={Colors.white} />
            <Text style={styles.lockText}>Unlock to view</Text>
          </View>
        )}
        <TouchableOpacity 
          onPress={toggleFavorite} 
          style={styles.favoriteButton}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Heart
            size={20}
            color={isFavorite ? Colors.secondary[500] : Colors.white}
            fill={isFavorite ? Colors.secondary[500] : 'transparent'}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.name}>{cocktail.name}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.timeContainer}>
              <Clock size={14} color={Colors.gray[500]} />
              <Text style={styles.timeText}>{cocktail.preparationTime}</Text>
            </View>
            {cocktail.type === 'premium' && (
              <View style={styles.premiumContainer}>
                <Text style={styles.premiumText}>${cocktail.price}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <UnlockModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        cocktail={cocktail}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginRight: Layout.spacing.lg,
    width: 200,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  horizontalContainer: {
    width: '100%',
    marginRight: 0,
    marginBottom: Layout.spacing.lg,
    flexDirection: 'row',
    height: 120,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  lockText: {
    ...Fonts.button,
    color: Colors.white,
    marginTop: 8,
    fontSize: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  content: {
    padding: Layout.spacing.md,
  },
  name: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    ...Fonts.caption,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  premiumContainer: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  premiumText: {
    ...Fonts.caption,
    color: Colors.white,
    fontSize: 12,
  },
});