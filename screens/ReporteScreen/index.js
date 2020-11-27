import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, ScrollView, StyleSheet, Text } from "react-native";
import { FontAwesome5, Entypo, MaterialCommunityIcons } from "@expo/vector-icons/";

import {
  Container,
  Header,
  Post,
  Title,
  BackButton,
  InputContainer,
  Avatar,
  TextInputContainer,
  Photo,
  ViewPhoto,
  ImageState,
  Txt,
  TitleDos,
  HeaderDos,

} from "./styles";
import styled from "styled-components";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import Icon from 'react-native-vector-icons/MaterialIcons'


import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../../utils/Fire";


const firebase = require("firebase");
require("firebase/firestore");



export default function ReporteScreen({ navigation }) {

  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShow(false)
  }

  const irHacia = () =>{
    setShow(false)
  }
  const handleOpen = () => {
    setShow(true)
  }
  return (

    <Container>
      <Header>

        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#2ed34f" />
        </BackButton>
        <View>
          <Txt>Motivos del reporte</Txt>
        </View>

      </Header>

      <TouchableOpacity onPress={() => { navigation.navigate('tableros') }}>
        <View style={styles.searchSection}>

          <Text style={styles.input}>Blablabla... </Text>
          <Entypo style={styles.searchIcon} name="chevron-right" size={20} color="#2ed34f" />
        </View>
      </TouchableOpacity>

      <HeaderDos>

        <Post onPress={() => navigation.goBack()}>

          <TitleDos><FontAwesome5 name="arrow-left" size={15} />{" "}Volver</TitleDos>

        </Post>
      </HeaderDos>
      <SCLAlert
        theme="danger"
        show={show}
        title="Reportar"
        subtitle="¿Deseas reportar ésta publicación?"
        cancellable={true}
        onRequestClose={handleClose}
      >
        <SCLAlertButton theme="danger" onPress={irHacia}>Aceptar</SCLAlertButton>
        <SCLAlertButton theme="danger" onPress={handleClose}>Cancelar</SCLAlertButton>

      </SCLAlert>
    </Container>
  )
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  label: {
    fontWeight: 'bold'
  },
  switch: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  searchSection: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },

  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 25,
    color: '#000',
  },
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
