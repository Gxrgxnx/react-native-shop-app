import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import {
  AddIcon,
  Button,
  ButtonIcon,
  CloseIcon,
  HStack,
  RemoveIcon,
} from '@gluestack-ui/themed';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  RootState,
  addToCart,
  removeFromCart,
  removeOneFromCart,
} from '../store';
import { Colors } from '../constants';

export const CartScreen = () => {
  const { items } = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    const calculatedTotal = items.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
    return calculatedTotal.toFixed(2);
  }, [items]);

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProductsText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((item) => (
          <HStack key={item.id} style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item?.image }} />
            <View style={styles.details}>
              <Text
                style={styles.itemTitle}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.title}
              </Text>
              <View style={styles.priceAndQuantity}>
                <View style={styles.quantityContainer}>
                  <Button
                    size="xs"
                    variant="solid"
                    style={styles.quantityButton}
                    onPress={() => dispatch(removeOneFromCart(item))}>
                    <ButtonIcon
                      size="xs"
                      as={RemoveIcon}
                      color={Colors.white}
                    />
                  </Button>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Button
                    size="xs"
                    variant="solid"
                    style={styles.quantityButton}
                    onPress={() => dispatch(addToCart(item))}>
                    <ButtonIcon size="xs" as={AddIcon} color={Colors.white} />
                  </Button>
                </View>
                <Text style={styles.itemPrice}>
                  {`$${(Number(item.price) * item.quantity).toFixed(2)}`}
                </Text>
              </View>
            </View>
            <Button
              size="xs"
              style={styles.removeButton}
              onPress={() => dispatch(removeFromCart(item))}>
              <ButtonIcon size="md" color={Colors.primary} as={CloseIcon} />
            </Button>
          </HStack>
        ))}
      </ScrollView>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>{`Total: $${totalPrice}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dirtyWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dirtyWhite,
  },
  noProductsText: {
    fontSize: 20,
    color: Colors.primary,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.white,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: '100%',
    resizeMode: 'contain',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    maxWidth: '70%',
    marginBottom: 10,
  },
  priceAndQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 6,
    color: Colors.primary,
  },
  quantityButton: {
    padding: 8,
    borderRadius: 5,
    width: 24,
    height: 24,
    backgroundColor: Colors.accent,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 0,
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  totalPriceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dirtyWhite,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    alignItems: 'flex-end',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
