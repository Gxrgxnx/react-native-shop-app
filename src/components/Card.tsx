import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HStack, View, Text } from '@gluestack-ui/themed';
import { Colors } from '../constants';

interface CardProps {
  title: string;
  price: string;
  category: string;
  image: string;
  onPress: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  price,
  category,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <HStack style={styles.details}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.price}>{`$${Number(price).toFixed(2)}`}</Text>
        </View>
      </HStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 20,
    marginHorizontal: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: 360,
  },
  details: {
    marginVertical: 10,
    marginHorizontal: 6,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    maxWidth: '75%',
    color: Colors.primary,
    marginBottom: 2,
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
});
