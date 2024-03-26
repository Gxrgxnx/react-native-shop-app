import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, ButtonIcon, ButtonText, HStack } from '@gluestack-ui/themed';
import { ShoppingCart } from 'lucide-react-native';
import { ProductDetailsScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState, addToCart } from '../store';
import { Colors } from '../constants';

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
}) => {
  const { productId } = route.params;
  const { products } = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const selectedProduct = products.find((product) => product.id === productId);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct?.image }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <HStack style={styles.details}>
            <View>
              <Text style={styles.title}>{selectedProduct?.title}</Text>
              <Text style={styles.category}>{selectedProduct?.category}</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.price}>
                {`$${Number(selectedProduct?.price).toFixed(2)}`}
              </Text>
            </View>
          </HStack>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionText}>
            {selectedProduct?.description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <Button style={styles.addButton} onPress={handleAddToCart}>
          <ButtonIcon size="md" as={ShoppingCart} />
          <ButtonText fontWeight="$normal" fontSize="$lg" marginLeft={8}>
            Add to Cart
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    marginTop: 10,
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingBottom: 100,
  },
  details: {
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    maxWidth: '80%',
  },
  category: {
    color: Colors.gray,
  },
  priceTag: {
    backgroundColor: Colors.accent,
    borderRadius: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    padding: 10,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.primary,
    marginTop: 20,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  addButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
