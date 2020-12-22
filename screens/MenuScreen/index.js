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
  Logo,
  HeaderDos,

} from "./styles";
import styled from "styled-components";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'


import Icon from 'react-native-vector-icons/MaterialIcons'

//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"



import { AppLoading } from "expo"
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../../utils/Fire";
import { SectionRow, SettingsPage, NavigateRow, SliderRow } from 'react-native-settings-view';
import { ImageBack } from "../ProfileScreen/styles";

const firebase = require("firebase");
require("firebase/firestore");



export default function MenuScreen({ navigation }) {



  const handleClose = () => {
    setShowAlert(false)
  }

  const handleOpen = () => {
    setShowAlert(true)
  }
  const [showAlert, setShowAlert] = useState(false);


  const [fontsLoaded, error] = useFonts({
    Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function handleLogout() {
    firebase.auth().signOut();
  }


  return (

    <Container>
      <Header>

        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#87d396"
         />
        </BackButton>
        <View>
          <Txt style={{ fontFamily: "Poppins_400Regular" }}>Ajustes y privacidad</Txt>
        </View>

      </Header>


      <View style={styles.searchSection}>
        <SettingsPage>
          <SectionRow title="Ayuda"
            titleStyle={{
              backgroundColor: '#fff', color: '#c2c2c2', marginTop: 20,

            }}
          >
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Informar un problema"
              leftIcon={{
                name: 'report-problem',
                type: 'material-icons',
                color: '#87d396'
              }}
             
            />
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={{
                marginLeft: 1, fontFamily: "Poppins_400Regular",
              }}
              text="Centro de ayuda"
              leftIcon={{
                name: 'handshake-o',
                type: 'font-awesome',
                color: '#87d396'
              }}
              onPress={() => console.log('policy')}
            />
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Centro de seguridad"
              leftIcon={{
                name: 'security',
                type: 'material-community-icons',
                color: '#87d396'
              }}
              onPress={() => console.log('contact')}
            />

          </SectionRow>

          <SectionRow title="Acerca de"
            titleStyle={{ backgroundColor: '#fff', color: '#c2c2c2', marginTop: 20 }}
          >
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Términos de uso"
              leftIcon={{
                name: 'file-document',
                type: 'material-community',
                color: '#87d396'
              }}

              onPress={() => navigation.navigate("termScreen")}
            />
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Normas de la comunidad"
              leftIcon={{
                name: 'users',
                type: 'font-awesome',
                color: '#87d396'
              }}
              onPress={() => console.log('policy')}
            />
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Política de seguridad"
              leftIcon={{
                name: 'bullhorn',
                type: 'font-awesome',
                color: '#87d396'
              }}
              onPress={() => console.log('contact')}
            />
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Política de derechos de autor"
              leftIcon={{
                name: 'address-card',
                type: 'font-awesome',
                color: '#87d396'
              }}
              onPress={() => console.log('contact')}
            />

          </SectionRow>

          <SectionRow title="Sesión"
            titleStyle={{ backgroundColor: '#fff', color: '#c2c2c2', marginTop: 20 }}
          >
            <NavigateRow
              dividerProps={{ marginLeft: 20, marginRight: 20, }}
              textStyle={styles.title}
              text="Cerrar sesión"
              leftIcon={{
                name: 'log-out',
                type: 'entypo',
                color: '#87d396'
              }}
              onPress={handleOpen}
            />


          </SectionRow>
        </SettingsPage>


        <SCLAlert
          theme="info"
          show={showAlert}
          title="¿Salir de Lithy?"
          subtitle={""}
          titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize: 22 }}

          cancellable={true}
          onRequestClose={handleClose}
          subtitleStyle={{
            fontSize: 18, fontFamily: "Poppins_300Light",
          }}
          headerIconComponent={<FontAwesome5 name="sign-out-alt" size={35} color="#FFF" />}

        >

          <SCLAlertButton
            theme="info"
            textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
            onPress={handleLogout}>
            Salir
                </SCLAlertButton>
          <SCLAlertButton
            theme="info"
            textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
            onPress={handleClose}>
            Cancelar
                </SCLAlertButton>
        </SCLAlert>

      </View>
    
      <View style={{flexDirection:'row', justifyContent: 'center',
      alignItems: 'center',
      }}>
        <TouchableOpacity
         onLongPress={() => navigation.navigate("pugScreen")}
         delayLongPress={2000}
         activeOpacity={1}
        >
        <Logo
        source={require('../../assets/Picture7.png')}
      >
      </Logo>
        </TouchableOpacity>
    
    
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
  },
  title: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 8,
  }
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
