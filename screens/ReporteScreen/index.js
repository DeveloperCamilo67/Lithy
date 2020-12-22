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

import { Title, Caption, Chip } from 'react-native-paper';
const firebase = require("firebase");
require("firebase/firestore");
import { SectionRow, SettingsPage, NavigateRow, SliderRow } from 'react-native-settings-view';



export default function ReporteScreen({ navigation }) {

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


  return (

    <Container>



      <Header>

        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#87d396" />
        </BackButton>
        <View>
          <Txt style={{fontFamily: "Poppins_400Regular",}}>Motivos del reporte</Txt>
        </View>

      </Header>

      <View style={{ margin: 10 }}>
        <Title style={{ textAlign: 'justify',fontFamily: "Poppins_500Medium"}}>
          Selecciona el motivo del reporte
    </Title>
        <Caption style={{ textAlign: 'justify', fontSize: 15, marginEnd: 55,
      fontFamily: "Poppins_400Regular"}}>
          Selecciona un motivo para poder reportar esta publicación.
    </Caption>




        <View style={styles.searchSection}>
          <SettingsPage>
            <SectionRow
              titleStyle={{
                backgroundColor: '#fff', color: '#c2c2c2', marginTop: 20,

              }}
            >
              <NavigateRow

                textStyle={styles.title}
                text="Spam"
                onPress={() => navigation.navigate("Spam")}


              />

              <NavigateRow

                textStyle={styles.title}
                text="Información errónea"

                onPress={() => navigation.navigate("Erroneo")}
              />

          

              <NavigateRow

                textStyle={styles.title}
                text="Publicación indebida"

                onPress={() => navigation.navigate("Indebido")}
              />
              <NavigateRow

                textStyle={styles.title}
                text="Mal uso de #etiquetas"

                onPress={() => navigation.navigate("MalUso")}
              />
              <NavigateRow

                textStyle={styles.title}
                text="Acoso a otros usuarios"

                onPress={() => navigation.navigate("Acoso")}
              />
              <NavigateRow

                textStyle={styles.title}
                text="Desnudez o pornografía"

                onPress={() => navigation.navigate("NoPor")}
              />
              <NavigateRow

                textStyle={styles.title}
                text="Autolesiones"
                onPress={() => navigation.navigate("Autolesiones")}
              />


            </SectionRow>


          </SettingsPage>



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
    fontSize: 22,
    right:10

  }
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
