import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from 'axios';

export default function EditBookScreen({ navigation, route }) {
  const { book, updateBook } = route.params;
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year);
  const [description, setDescription] = useState(book.description);
  const [coverImage, setCoverImage] = useState(book.coverImage);

  const handleSave = async () => {
    const updatedBook = {
      ...book,
      title,
      author,
      year,
      description,
      coverImage,
    };

    try {
      const response = await axios.put(`http://192.168.1.189:5000/books/${book.id}`, updatedBook);
      updateBook(response.data); // Mettre à jour l'état avec le livre modifié
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du livre:", error);
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
