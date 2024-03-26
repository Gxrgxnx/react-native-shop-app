import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { ScreensEnum } from '../enums';
import {
  ProductsOverviewScreen,
  ProductDetailsScreen,
  CartScreen,
} from '../screens';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';
import { Colors } from '../constants';
import { CartButton } from '../components';

export const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { products } = useAppSelector((state: RootState) => state.product);
  const { items } = useAppSelector((state: RootState) => state.cart);

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  const cartItemsQuantity = useMemo(() => {
    return items
      .filter((item) => item.quantity)
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreensEnum.ProductsOverviewScreen}
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.primary : Colors.white,
          },
          headerTintColor:
            Platform.OS === 'android' ? Colors.white : Colors.primary,
        }}>
        <Stack.Screen
          name={ScreensEnum.ProductsOverviewScreen}
          component={ProductsOverviewScreen}
          options={() => ({
            title: 'All Products',
            headerRight: () => <CartButton count={cartItemsQuantity} />,
            headerShown: true,
          })}
        />

        <Stack.Screen
          name={ScreensEnum.ProductDetailsScreen}
          component={ProductDetailsScreen}
          options={({ route }) => {
            const product = getProductById(route.params?.productId);
            return {
              title: product ? product.title : 'Loading...',
              headerRight: () => {
                return <CartButton count={cartItemsQuantity} />;
              },
              headerShown: true,
            };
          }}
        />
        <Stack.Screen
          name={ScreensEnum.CartScreen}
          component={CartScreen}
          options={{
            title: 'Cart',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
