import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from 'axios';

export default function AddBookScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSave = async () => {
    const newBook = {
      title,
      author,
      year,
      description,
      coverImage,
    };

    try {
      const response = await axios.post('http://192.168.1.189:5000/books', newBook);
      route.params.addBook(response.data); // Mettre à jour l'état avec le nouveau livre ajouté
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Auteur</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      <Text style={styles.label}>Année de Publication</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
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
        value={coverImage}
        onChangeText={setCoverImage}
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
