import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, ScrollView, StyleSheet, Text } from "react-native";
import { FontAwesome5, AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons/";

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
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"
import Fire from "../../utils/Fire";
import { Kohana } from 'react-native-textinput-effects';
const firebase = require("firebase");
require("firebase/firestore");



export default function NuevoTableroScreen({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  const [text, setText] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  //TODO: Obtiene usuario de la DB
  async function getUser() {
    let unsubscribe = null;
    const userId = Fire.shared.uid;

    unsubscribe = await Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => {
        setUser(doc.data());
      });
    // console.tron.log(user);
  }

  //TODO: Crea un tablero
  function crearTab() {
    setLoading(true);

    Fire.shared
      .addTab({
        name: user.name,
        apellido: user.apellido,
        text,
      })
      .then(ref => {

        setText();
        navigation.navigate("tableros");
        setLoading(false);
      })
      .catch(error => {
        alert(error);
      })
  }
  //TODO: Declaro mis familia de fuentes
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
          <FontAwesome5 name="arrow-left" size={24} color="#2ed34f" />
        </BackButton>
        <View>
          <Txt style={{ fontFamily: "Poppins_400Regular", }}>Crear tablero</Txt>
        </View>

      </Header>

      <View style={styles.section}>

        <Kohana
          style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
          label={'Nombre del tablero'}
          iconClass={FontAwesome5}
          iconName={'edit'}
          iconColor={'#87d396'}
          inputPadding={5}
          labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}

          useNativeDriver
          autoFocus={true}
          onChangeText={setText}
          maxLength={18}
          value={text}
      

        />
      </View>
      <HeaderDos>

        <Post onPress={crearTab} disable={loading} disabled={text === ''}
         style={[

          {
            backgroundColor:
         
                  text === ''
                  ? '#b5d3bb'
                  : '#87d396'
              
          },
        ]}
        >
          {loading ? (
            <Loading />
          ) : (
              <TitleDos style={{ fontFamily: "Poppins_500Medium" }}>Crear{" "}<FontAwesome name="check" size={15} /></TitleDos>

            )}

        </Post>


      </HeaderDos>
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
    margin: 15,
    height: 30,
    marginBottom: 380,
    maxWidth: 310,

  },

  searchSectionDos: {
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
  },
  inputDos: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 48,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#87d396',
  },
  section: {
    flexDirection: 'row',

    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor:'#d7dbdd',
    alignItems: 'center',
    marginTop: 10
},
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
