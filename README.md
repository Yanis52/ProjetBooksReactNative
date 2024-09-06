## Install dependencies :

## npm install @react-navigation/native @react-navigation/stack

## npm install react-native-screens react-native-safe-area-context

## npm install @react-native-async-storage/async-storage

Run with :
npm run android

---

Run Api:
cd api-flask &&
py ./main.py

1. HomeScreen - Écran d'accueil

Cet écran affiche une liste de produits récupérés depuis un serveur et offre des options pour ajouter, modifier ou supprimer un produit.
Fonctionnalités :

    Chargement des produits : L'application utilise axios pour faire une requête GET vers l'API pour récupérer les produits.
    Navigation : L'utilisateur peut naviguer vers :
        L'écran d'ajout d'un produit.
        L'écran de modification d'un produit.
        L'écran des détails d'un produit.
    Suppression d'un produit : Un produit peut être supprimé via une requête DELETE vers l'API. Une fenêtre modale est utilisée pour confirmer la suppression.

Hooks utilisés :

    useFocusEffect : Rechargement des produits à chaque fois que l'utilisateur revient sur l'écran d'accueil.
    useState : Pour gérer les états locaux comme la liste des produits, la visibilité de la modale, et le produit sélectionné.

Composants importants :

    FlatList : Affiche les produits sous forme de liste.
    Modal : Fenêtre modale pour confirmer la suppression d'un produit.

2. EditProductScreen - Écran de modification de produit

Cet écran permet de modifier un produit existant.
Fonctionnalités :

    Les champs du produit (nom, description, prix, quantité, image) sont pré-remplis avec les informations actuelles du produit.
    Mise à jour d'un produit : En cliquant sur "Enregistrer", une requête PUT est envoyée à l'API avec les nouvelles informations du produit. Si la mise à jour réussit, l'utilisateur est redirigé vers l'écran d'accueil.

Hooks utilisés :

    useState : Pour gérer les valeurs des champs de formulaire comme le nom, prix, description, etc.

Navigation :

    Après modification réussie, l'utilisateur est redirigé vers l'écran d'accueil.

3. AddProductScreen - Écran d'ajout de produit

Cet écran permet à l'utilisateur d'ajouter un nouveau produit.
Fonctionnalités :

    L'utilisateur peut entrer les informations d'un nouveau produit (nom, description, prix, quantité, image).
    Ajout d'un produit : En cliquant sur "Enregistrer", une requête POST est envoyée à l'API pour ajouter un produit. Si l'ajout réussit, le nouvel élément est ajouté à la liste des produits dans l'écran d'accueil.

Hooks utilisés :

    useState : Gère les informations d'un nouveau produit (nom, prix, etc.).

Navigation :

    Après l'ajout du produit, l'utilisateur est redirigé vers l'écran d'accueil.

4. ProductDetailsScreen - Écran de détails du produit

Cet écran affiche les détails d'un produit individuel.
Fonctionnalités :

    Affichage : Affiche les informations détaillées du produit (nom, description, prix, quantité, et image).
    Suppression d'un produit : L'utilisateur peut supprimer le produit actuel via une requête DELETE.
    Modification d'un produit : L'utilisateur peut naviguer vers l'écran de modification pour mettre à jour le produit.

Hooks utilisés :

    route.params : Utilisé pour recevoir les informations du produit depuis l'écran d'accueil.

Points communs des écrans :

    Footer : Chaque écran comporte un texte en bas mentionnant "Développé par Kenuhn" ou "Développé par Yanis Habarek".
    Gestion des erreurs : Chaque opération d'API (GET, POST, PUT, DELETE) gère les erreurs avec un try-catch pour afficher un message en cas d'échec.

API :

Toutes les requêtes sont effectuées vers un serveur local à l'adresse http://192.168.1.51:5000/products.

    GET /products : Récupère la liste des produits.
    POST /products : Ajoute un nouveau produit.
    PUT /products/{id} : Met à jour un produit existant.
    DELETE /products/{id} : Supprime un produit.

Styles :

Chaque écran a son propre style avec des éléments comme :

    container : Gère l'agencement principal des éléments sur l'écran.
    label et input : Utilisés pour les champs de formulaire.
    buttonsContainer : Agencement des boutons pour la suppression et la modification.

Cette application offre une interface simple pour gérer un inventaire, avec des fonctionnalités classiques de CRUD (Create, Read, Update, Delete).
