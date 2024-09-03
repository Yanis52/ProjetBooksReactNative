import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AddBookScreen from "./Components/AddBookScreen";
import BookDetailsScreen from "./Components/BookDetailsScreen";
import EditBookScreen from "./Components/EditBookScreen";
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
          component={BookDetailsScreen}
          options={{ title: "Détails du Livre" }}
        />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="EditBook" component={EditBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
