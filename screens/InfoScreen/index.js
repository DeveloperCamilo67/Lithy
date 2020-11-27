import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Share, ScrollView, StyleSheet, Text } from "react-native";
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

import {useFonts,Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

const firebase = require("firebase");
require("firebase/firestore");



export default function InfoScreen({ navigation },props) {

  const [show, setShow] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
      
        title:'Instala lithy',
        message:'Hola!, te invitamos a instalar la app Lithy',

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

  const irHacia = () =>{
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

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <Container>
      <Header>

        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#2ed34f" />
        </BackButton>
        <View>
          <Txt style={{ fontFamily: "Poppins_400Regular",}}>¿Que quieres hacer?</Txt>
        </View>

      </Header>

      <TouchableOpacity onPress={() => { navigation.navigate('tableros') }}>
        <View style={styles.searchSection}>

          <Text style={styles.input}>Guardar en mis tableros </Text>
          <Entypo style={styles.searchIcon} name="chevron-right" size={20} color="#2ed34f" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onShare}>

        <View style={styles.searchSection}>

          <Text style={styles.input}>Compartir esta publicación</Text>
          <Entypo style={styles.searchIcon} name="chevron-right" size={20} color="#2ed34f" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleOpen}>
        <View style={styles.searchSection}>

          <Text style={styles.input}>Reportar esta publicación</Text>
          <Entypo style={styles.searchIcon} name="chevron-right" size={20} color="#2ed34f" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>

        <View style={styles.searchSection}>
          <Text style={styles.input}>No me interesa...</Text>
          <Entypo style={styles.searchIcon} name="chevron-right" size={20} color="#2ed34f" />
        </View>
      </TouchableOpacity>
      <Name style={{ fontFamily: "Poppins_400Regular",}}>{props.name}{" "}{props.apellido}</Name>
      <HeaderDos>
   

        <Post onPress={() => navigation.goBack()}>

          <TitleDos style={{fontFamily: "Poppins_500Medium"}}><FontAwesome5 name="arrow-left" size={15} />{" "}Volver</TitleDos>

        </Post>
      </HeaderDos>
      <SCLAlert
        theme="danger"
        show={show}
        title="Reportar"
        subtitle="¿Deseas reportar ésta publicación?"
        subtitleStyle={{ fontSize: 17, fontFamily: "Poppins_300Light", }}
        titleStyle={{ fontFamily:"Poppins_600SemiBold",}}
        headerIconComponent={<FontAwesome5 name="flag" size={35} color="#FFF" />}
        cancellable={true}
        onRequestClose={handleClose}
      >
        <SCLAlertButton theme="danger" onPress={irHacia}  
        textStyle={{ color: "#FFF", fontFamily:"Poppins_600SemiBold",}}>Aceptar</SCLAlertButton>
        <SCLAlertButton theme="danger" onPress={handleClose} 
        textStyle={{ color: "#FFF", fontFamily:"Poppins_600SemiBold",}}>Cancelar</SCLAlertButton>

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
    fontFamily:"Poppins_300Light"
  },
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
