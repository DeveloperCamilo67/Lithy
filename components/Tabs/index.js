import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View } from "react-native"

import { FontAwesome5 } from '@expo/vector-icons'
import {
  FeedItem,
  Container,
  Name,
  Pais,
  Header,
  Footer,
  Directionrow,
  DescriptionText,
  Time,
  Avatar,
  ImagePost,
  ImageBack,
  Etiquetas
} from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
//fuentes
import ImageLoad from 'react-native-image-placeholder';

import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

const ItemTask = (props) => {


  const handleClose = () => {
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true)
  }



  const [show, setShow] = useState(false);
  const [placeholder] = useState("Eliminar ")

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


    <View>

      <FeedItem>

        <SCLAlert
          theme="danger"
          show={show}
          title={placeholder+props.text}
          subtitle="¿Estás seguro de eliminar este tablero?"
          cancellable={true}
          onRequestClose={handleClose}
          subtitleStyle={{ fontSize: 17, fontFamily: "Poppins_300Light", }}
          titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize:18 }}
          headerIconComponent={<FontAwesome5 name="trash-alt" size={35} color="#FFF" />}
        >
          <SCLAlertButton theme="danger" onPress={props.deleteTab.bind(this, props)}>Si, estoy seguro</SCLAlertButton>
          <SCLAlertButton theme="danger" onPress={handleClose}>Cancelar</SCLAlertButton>

        </SCLAlert>

        <DescriptionText style={{ fontFamily: "Poppins_500Medium" }}>{props.text}</DescriptionText>
        
        <Container>

          <Directionrow>
            <Header>

              <View style={{ flexDirection: 'row', }}>

              </View>


            </Header>

          </Directionrow>


        </Container>
        <TouchableOpacity onPress={handleOpen}>
          <FontAwesome5 name="trash-alt" size={24} color="#dd3636" />
        </TouchableOpacity>
      </FeedItem>
    </View>

  )
};

export default ItemTask;

