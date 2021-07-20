import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Anotacao = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00AEEF",
    padding: 8,
    borderRadius: 10,
    flex: 1,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
  },
});

export default Anotacao;
