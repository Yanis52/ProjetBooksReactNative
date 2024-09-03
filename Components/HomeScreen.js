import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// moks a changer par data persistante
const mockBooks = [
  {
    id: "1",
    title: "Livre 1",
    author: "Auteur 1",
    coverImage: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    title: "Livre 2",
    author: "Auteur 2",
    coverImage: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    title: "Livre 3",
    author: "Auteur 3",
    coverImage: "https://via.placeholder.com/100",
  },
];

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState(mockBooks);

  const handleAddBook = () => {
    navigation.navigate("AddBook", {
      addBook: (newBook) => setBooks([...books, newBook]),
    });
  };

  const handleEditBook = (book) => {
    navigation.navigate("EditBook", {
      book,
      updateBook: (updatedBook) =>
        setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b))),
    });
  };
  const handleDeleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { book: item })}
    >
      <View style={styles.bookContainer}>
        <Image source={{ uri: item.coverImage }} style={styles.bookImage} />
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <View style={styles.buttonsContainer}>
            <Button title="Modifier" onPress={() => handleEditBook(item)} />
            <Button
              title="Supprimer"
              onPress={() => handleDeleteBook(item.id)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Ajouter un Livre" onPress={handleAddBook} />
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
  bookContainer: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  bookImage: {
    width: 100,
    height: 100,
  },
  bookDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
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
});
