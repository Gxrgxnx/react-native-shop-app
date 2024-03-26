import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  ProductsOverviewScreen: undefined;
  ProductDetailsScreen: { productId: number };
  CartScreen: undefined;
};

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

export interface ProductDetailsScreenProps {
  route: ProductDetailsScreenRouteProp;
}
