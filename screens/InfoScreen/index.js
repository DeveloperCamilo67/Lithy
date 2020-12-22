import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Share, ScrollView, StyleSheet, Text } from "react-native";
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
  ImagePost,
  Txt,
  TitleDos,
  HeaderDos,
  Name,

} from "./styles";
import styled from "styled-components";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { SectionRow, SettingsPage, NavigateRow, SliderRow } from 'react-native-settings-view';

import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

const firebase = require("firebase");
require("firebase/firestore");

import { Title, Caption, Chip } from 'react-native-paper';

export default function InfoScreen( {navigation}, props ) {

  const [show, setShow] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({

        title: 'Instala lithy',
        message: 'Hola!, te invitamos a instalar la app Lithy',

      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const handleClose = () => {
    setShow(false)
  }

  const irHacia = () => {
    navigation.navigate("reporte")
    setShow(false)
  }
  const handleOpen = () => {
    setShow(true)
  }

  const [fontsLoaded, error] = useFonts({
    Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <Container>
      <Header>

        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#87d396"
          />
        </BackButton>
        <View>
          <Txt style={{ fontFamily: "Poppins_400Regular", }}>¿Que quieres hacer?</Txt>
        </View>

      </Header>


      <View style={{ margin: 10 }}>
        <Title style={{ textAlign: 'justify', fontFamily: "Poppins_500Medium" }}>
          ¿Que deseas hacer?
    </Title>
        <Caption style={{
          textAlign: 'justify', fontSize: 15, marginEnd: 55,
          fontFamily: "Poppins_400Regular"
        }}>
          Selecciona una opción
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
                text="Guardar en mis tableros"
                onPress={() => { navigation.navigate('tableros') }}


              />

              <NavigateRow

                textStyle={styles.title}
                text="Compartir esta publicación"

                onPress={onShare}
              />



              <NavigateRow

                textStyle={styles.title}
                text="Reportar esta publicación"

                onPress={irHacia}
              />



            </SectionRow>


          </SettingsPage>




        </View>
        <Name style={{ fontFamily: "Poppins_400Regular", }}>{props.name}</Name>
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
    fontFamily: "Poppins_300Light"
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    right: 10

  }
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
