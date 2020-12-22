import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, ScrollView, StyleSheet, Text } from "react-native";
import { FontAwesome5, Entypo, MaterialCommunityIcons } from "@expo/vector-icons/";

import {
  Container,
  Header,
  Post,
  BackButton,
  InputContainer,
  Avatar,
  TextInputContainer,
  Photo,
  ViewPhoto,
  ImageState,
  Txt,
  HeaderDos,
  TitleDos

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

import { Title, Caption, Headline, Subheading, Paragraph } from 'react-native-paper';
const firebase = require("firebase");
require("firebase/firestore");
import { SectionRow, SettingsPage, NavigateRow, SliderRow } from 'react-native-settings-view';



export default function Propiedad({ navigation }) {

  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShow(false)
  }

  const irHacia = () => {
    setShow(false)
  }
  const handleOpen = () => {
    setShow(true)
  }

  const ya = () => {
    { visible ? 'selected' : 'selected' }
  }

  const [visible, setVisible] = useState(false);
  const dataSource = ["Volvo",
    "Alpha Sports", "Ford", "Gräf & Stift",
    "Aston Martin", "BMW", "Tarrant Automobile",
    "Push", "Österreichische Austro-Fiat",
    "Mazda", "Rosenbauer"]


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

      <View style={{ margin: 10 }}>
        <Title style={{ textAlign: 'justify', fontSize: 27 }}>
          ¿Reportar esta publicación por propiedad intelectual?
    </Title>
        <Paragraph style={{ textAlign: 'justify', fontSize: 15, marginEnd: 20 }}>
          Si seleccionas esta opción elimminaremos estos siguientes contenidos:
    </Paragraph>
        <View style={{ margin: 10 }}>
          <Caption style={{ textAlign: 'justify', fontSize: 15, marginEnd: 1 }}>
            <Text>{'\u2B24'}</Text> Contenido o publicación engañosa
    </Caption>
          <Caption style={{ textAlign: 'justify', fontSize: 15, marginEnd: 1 }}>
            <Text>{'\u2B24'}</Text> Publicaciones repetitivas
    </Caption>
        </View>



        <View style={styles.searchSection}>


          <TouchableOpacity style={styles.login}
          onPress={()=>navigation.navigate("Inicio")}
          >

            <Text style={styles.textLogin}>Reportar</Text>

          </TouchableOpacity>

        </View>

      </View>

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
  searchSection: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },
  textLogin: {
    color: 'white',
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",

},
  login: {
    width: '100%',
    height: 40,
    backgroundColor: '#87d396',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 10
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
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22

  }
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
