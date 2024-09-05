import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product, updateProductList } = route.params;

  const handleEditProduct = () => {
    navigation.navigate('EditProduct', { product });
  };

  const handleDeleteProduct = async () => {
    try {
      // Envoi de la requête DELETE à l'API Flask
      await axios.delete(`http://192.168.1.51:5000/products/${product.id}`);
      
      // Mise à jour de la liste des livres
      updateProductList(product.id);

      // Retour à l'écran d'accueil après suppression
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert("Erreur", "La suppression du produit a échoué.");
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image_url }} style={styles.productImage} />
      <Text style={styles.productNom}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Prix : {product.price}</Text>
      <Text style={styles.productQuantity}>Quantité : {product.quantity}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Modifier" onPress={handleEditProduct} />
        <Button title="Supprimer" onPress={handleDeleteProduct} />
      </View>
      <Button title="Retour à l'Accueil" onPress={() => navigation.navigate('Home')} />
      <Text style={styles.footerText}>Développé par Yanis Habarek</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  productNom: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productQuantity: {
    fontSize: 16,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#aaa',
  },
});
