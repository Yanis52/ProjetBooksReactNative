import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from 'axios';

export default function AddProductScreen({ navigation, route }) {
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.00);
  const [quantity, setQuantity] = useState(0);

  const handleSave = async () => {
    const newProduct = {
      description,
      image_url,
      name,
      price: price.replace(',','.'),
      quantity,
    };

    try {
      const response = await axios.post('http://192.168.1.51:5000/products', newProduct);
      route.params.addProduct(response.data); // Mettre à jour l'état avec le nouveau produit ajouté
      console.log("Bien ajouté");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      
      <Text style={styles.label}>Quantité</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Prix</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
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
