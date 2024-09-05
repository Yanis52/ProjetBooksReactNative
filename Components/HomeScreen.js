import React, { useState, useCallback } from 'react';
import { Button, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.1.51:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleAddProduct = () => {
    navigation.navigate("AddProduct", {
      addProduct: (newProduct) => setProducts((prevProducts) => [...prevProducts, newProduct]),
    });
  };

  const handleEditProduct = (product) => {
    navigation.navigate("EditProduct", {
      product,
      updateProduct: (updatedProduct) =>
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        ),
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://192.168.1.51:5000/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      setModalVisible(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { product: item, updateProductList: setProducts })}>
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image_url }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Prix : {item.price}</Text>
                <Text style={styles.productPrice}>Quantité : {item.quantity}</Text>
                <View style={styles.buttonsContainer}>
                  <Button title="Modifier" onPress={() => handleEditProduct(item)} />
                  <Button title="Supprimer" onPress={() => confirmDelete(item)} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Ajouter un produit" onPress={handleAddProduct} />

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmer la suppression</Text>
            <Text style={styles.modalText}>Voulez-vous vraiment supprimer "{selectedProduct?.name}" ?</Text>
            <View style={styles.modalButtons}>
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
              <Button title="Supprimer" onPress={() => handleDeleteProduct(selectedProduct.id)} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.footerText}>Développé par Yanis Habarek</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#aaa",
  },
  // Styles pour la modale
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
