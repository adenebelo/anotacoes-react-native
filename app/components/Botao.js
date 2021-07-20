import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Botao = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || "#FFF"}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#00AEEF",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export default Botao;
