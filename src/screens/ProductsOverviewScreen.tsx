import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { RotateCcw } from 'lucide-react-native';
import { RootStackParamList, Product } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState, fetchProducts } from '../store';
import { Card, SearchBar } from '../components';
import { Colors, ERROR_MESSAGES } from '../constants';
import { ScreensEnum } from '../enums';

export const ProductsOverviewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector(
    (state: RootState) => state.product,
  );
  const initialDataLimit = 10;
  const [dataLimit, setDataLimit] = useState(initialDataLimit);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    if (searchPhrase !== '') {
      setListProducts(
        products.filter(
          (product) =>
            product.category
              .toUpperCase()
              .includes(searchPhrase.toUpperCase()) ||
            product.title.toUpperCase().includes(searchPhrase.toUpperCase()),
        ),
      );
    } else {
      setListProducts(products);
    }
  }, [products, searchPhrase]);

  useEffect(() => {
    const isInitialFetch = dataLimit === initialDataLimit ? true : false;

    dispatch(fetchProducts(dataLimit, isInitialFetch));
  }, [dispatch, dataLimit]);

  const handlePressCard = (productId: number) => {
    navigation.navigate(ScreensEnum.ProductDetailsScreen, { productId });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorMessage}>
          {ERROR_MESSAGES.SOMETHING_WENT_WRONG}
        </Text>
        <Button
          size="sm"
          variant="solid"
          style={styles.reloadButton}
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            dispatch(fetchProducts(dataLimit, true));
          }}>
          <ButtonText style={styles.reloadMessage}>Try again </ButtonText>
          <ButtonIcon as={RotateCcw} color={Colors.white} />
        </Button>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        focused={isSearchFocused}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setIsFocused={setIsSearchFocused}
      />
      {searchPhrase && listProducts.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      ) : (
        <FlatList
          data={listProducts}
          initialNumToRender={10}
          keyExtractor={(item) => item.id as any}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              price={item.price}
              category={item.category}
              image={item.image}
              onPress={() => handlePressCard(item.id)}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (dataLimit <= products.length) {
              setDataLimit(dataLimit + 10);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: Colors.dirtyWhite,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
  },
  reloadButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  reloadMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  noItemsText: {
    fontSize: 20,
    color: Colors.primary,
    textAlign: 'center',
  },
});
