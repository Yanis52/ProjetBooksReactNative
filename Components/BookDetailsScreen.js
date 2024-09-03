import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function BookDetailsScreen({ route, navigation }) {
  const { book } = route.params;

  const handleEditBook = () => {
    // KENUHN:Ajoute(encore) la navigation vers l'écran de modification de livre ici
    // navigation.navigate('EditBook', { book });  //  décommente plus tard
  };

  const handleDeleteBook = () => {
    // suppression du livre a add ici plus tard
    
    // Après suppression, retourner à l'écran d'accueil
    // navigation.navigate('Home');  // KENUHN DECOMMENTE CETTE LIGNE PLUS TARD DUCOUP
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.coverImage }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.bookAuthor}>Auteur: {book.author}</Text>
      <Text style={styles.bookYear}>Année de publication: {book.year}</Text>
      <Text style={styles.bookDescription}>{book.description}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Modifier" onPress={handleEditBook} />
        <Button title="Supprimer" onPress={handleDeleteBook} />
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
  bookImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 18,
    marginBottom: 10,
  },
  bookYear: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookDescription: {
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
