import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from 'axios';

export default function EditProductScreen({ navigation, route }) {
  const { product, updateProduct } = route.params;
  const [description, setDescription] = useState(product.description);
  const [image_url, setImage_url] = useState(product.image_url);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSave = async () => {
    const updatedProduct = {
      ...product,
      description,
      image_url,
      name,
      price,
      quantity,
    };

    try {
      const response = await axios.put(`http://192.168.1.51:5000/products/${product.id}`, updatedProduct);
      updateProduct(response.data);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Prix</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Quantité</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>URL de l'Image de Couverture</Text>
      <TextInput
        style={styles.input}
        value={image_url}
        onChangeText={setImage_url}
      />

      <Button title="Enregistrer" onPress={handleSave} />
      <Text style={styles.footerText}>Développé par Kenuhn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#aaa",
  },
});
