import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import Botao from "./Botao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../contexts/NoteProvider";
import AddNota from "./AddNota";

const DetalhesNota = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Você tem certeza?",
      "Esa anotação será excluída permanentemente",
      [
        {
          text: "Excluir",
          onPress: deleteNote,
        },
        {
          text: "Cancelar",
          onPress: () => console.log("cancelar"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Botao
          antIconName="delete"
          style={{ backgroundColor: "#ff0000", marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <Botao antIconName="edit" onPress={openEditModal} />
      </View>
      <AddNota
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: "#00AEEF",
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default DetalhesNota;
