import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import Anotacao from "../components/Anotacao";
import AddNota from "../components/AddNota";
import Botao from "../components/Botao";
import { useNotes } from "../contexts/NoteProvider";

const reverseData = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const TelaPrincipal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { notes, setNotes } = useNotes();

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const openNote = (note) => {
    navigation.navigate("DetalhesNota", { note });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Anotações`}</Text>
          {notes.length ? (
            <FlatList
              data={reverseNotes}
              vertical
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Anotacao onPress={() => openNote(item)} item={item} />
              )}
            />
          ) : null}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Crie uma nova anotação</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <Botao
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        style={styles.addBtn}
      />
      <AddNota
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingTop: 15,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default TelaPrincipal;
