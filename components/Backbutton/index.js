import React from "react";
import { View } from "react-native";

import { BackButton } from "./styles";
import Icon from "@expo/vector-icons/Ionicons";

export default function Backbutton({ navigation }) {
  return (
    <>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="ios-arrow-back" size={24} color="##d8d9db" />
      </BackButton>
    </>
  );
}