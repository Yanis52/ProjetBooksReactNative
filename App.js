import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AddProductScreen from "./Components/AddProductScreen";
import ProductDetailsScreen from "./Components/ProductDetailsScreen";
import EditProductScreen from "./Components/EditProductScreen";
import HomeScreen from "./Components/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Accueil" }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{ title: "Détails du produit" }}
        />
        <Stack.Screen 
          name="AddProduct" 
          component={AddProductScreen}
          options={{ title: "Ajout d'un produit" }}
        />
        <Stack.Screen 
          name="EditProduct" 
          component={EditProductScreen}
          options={{ title: "Modification du produit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
