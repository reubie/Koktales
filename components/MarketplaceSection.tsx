import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { ShoppingBag, Star, TrendingUp } from 'lucide-react-native';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  category: 'equipment' | 'ingredients' | 'tools';
};

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Cocktail Shaker Set',
    price: '$49.99',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
    rating: 4.8,
    category: 'equipment',
  },
  {
    id: '2',
    name: 'Premium Mixing Glass',
    price: '$29.99',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
    rating: 4.5,
    category: 'equipment',
  },
  // Add more products as needed
];

export default function MarketplaceSection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {featuredProducts.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productMeta}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color={Colors.secondary[500]} />
                  <Text style={styles.rating}>{product.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <ShoppingBag size={24} color={Colors.secondary[500]} />
          <Text style={styles.categoryText}>Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <TrendingUp size={24} color={Colors.secondary[500]} />
          <Text style={styles.categoryText}>Ingredients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  title: {
    ...Fonts.heading,
    fontSize: 20,
    color: Colors.gray[800],
  },
  viewAll: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.secondary[500],
  },
  productsContainer: {
    paddingHorizontal: Layout.spacing.lg,
  },
  productCard: {
    width: 200,
    marginRight: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    shadowColor: Colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: Layout.borderRadius.lg,
    borderTopRightRadius: Layout.borderRadius.lg,
  },
  productInfo: {
    padding: Layout.spacing.md,
  },
  productName: {
    ...Fonts.subheading,
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.xs,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    ...Fonts.button,
    fontSize: 16,
    color: Colors.secondary[500],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Fonts.body,
    fontSize: 14,
    color: Colors.gray[600],
    marginLeft: 4,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.lg,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.full,
  },
  categoryText: {
    ...Fonts.button,
    fontSize: 14,
    color: Colors.gray[800],
    marginLeft: Layout.spacing.xs,
  },
}); 