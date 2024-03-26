import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ButtonIcon, View, Text } from '@gluestack-ui/themed';
import { ShoppingCart } from 'lucide-react-native';
import { RootStackParamList } from '../types/navigation';
import { ScreensEnum } from '../enums';
import { Colors } from '../constants';

interface CartButtonProps {
  count: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ count }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate(ScreensEnum.CartScreen)}>
        <ButtonIcon size="xl" as={ShoppingCart} color={Colors.white} />
        {count > 0 && (
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>{count > 99 ? '99+' : count}</Text>
          </View>
        )}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
  quantityContainer: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: Colors.red,
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: Colors.white,
    fontSize: 12,
  },
});
