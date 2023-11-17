import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './cartContext';
import { products } from './products';

const ConfirmPage = () => {
  const navigation = useNavigation();
  const { cart, clearCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    const totalPrice = Object.keys(cart).reduce(
      (total, productId) =>
        total + cart[productId] * products.find((p) => p.id === parseInt(productId)).price,
      0
    );
    return totalPrice.toFixed(2);
  };

  const handleConfirmPage = () => {
    clearCart();
    navigation.navigate('ProductList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.paymentDetailsContainer}>
        <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
        <Text style={styles.productListTitle}>Added Products:</Text>
        {Object.keys(cart).map((productId) => (
          <View key={productId} style={styles.productItem}>
            <Text style={styles.productName}>
              {products.find((p) => p.id === parseInt(productId)).name}
            </Text>
            <Text style={styles.quantityText}>Quantity: {cart[productId]}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPage}>
        <Text style={styles.confirmButtonText}>Clear and Submit Order</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'green',
  },
  paymentDetailsContainer: {
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  productListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  productItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    paddingBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'green',
  },
  quantityText: {
    fontSize: 14,
    color: '#555',
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmPage;
