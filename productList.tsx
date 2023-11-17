import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './cartContext';
import { products } from './products';
import { commonStyles } from './commonStyles';

const ProductList = () => {
  const navigation = useNavigation();
  const { addToCart, removeFromCart, cart } = useCart();

  const navigateToProductDetails = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const navigateToConfirmPage = () => {
    navigation.navigate('ConfirmPage');
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => addToCart(item.id)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{cart[item.id] || 0}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[commonStyles.container, { backgroundColor: '#F2F2F2' }]}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={navigateToConfirmPage}>
        <Text style={styles.confirmButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    color: 'green',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  confirmButton: {
    ...commonStyles.confirmButton,
    marginTop: 16,
  },
  confirmButtonText: {
    ...commonStyles.confirmButtonText,
  },
});

export default ProductList;
