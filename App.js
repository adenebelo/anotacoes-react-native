import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import TelaPrincipal from "./app/principal/TelaPrincipal";
import DetalhesNota from "./app/components/DetalhesNota";
import NoteProvider from "./app/contexts/NoteProvider";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});

  const renderTelaPrincipal = (props) => (
    <TelaPrincipal {...props} user={user} />
  );

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: "", headerTransparent: true }}
        >
          <Stack.Screen component={renderTelaPrincipal} name="TelaPrincipal" />
          <Stack.Screen component={DetalhesNota} name="DetalhesNota" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}
