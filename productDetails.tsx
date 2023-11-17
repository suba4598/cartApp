import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './cartContext';
import { commonStyles } from './commonStyles';

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();

  const { product } = route.params;
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(cart[product.id] || 0);

  const handleAddToCart = () => {
    addToCart(product.id);
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      removeFromCart(product.id);
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const navigateToConfirmPage = () => {
    navigation.navigate('ConfirmPage');
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: '#F2F2F2' }]}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description || 'No description available'}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleAddToCart}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleRemoveFromCart}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={navigateToConfirmPage}>
        <Text style={styles.confirmButtonText}>Go to Cart</Text>
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
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    fontSize: 24,
    color: 'green',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
    color: '#333',
  },
  confirmButton: {
    ...commonStyles.confirmButton,
    marginTop: 16,
  },
  confirmButtonText: {
    ...commonStyles.confirmButtonText,
  },
});

export default ProductDetails;
