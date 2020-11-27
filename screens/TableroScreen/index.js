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
  Feed,

} from "./styles";
import styled from "styled-components";

import Icon from 'react-native-vector-icons/MaterialIcons'

import Fire from "../../utils/Fire";

const firebase = require("firebase");
require("firebase/firestore");
import { withNavigationFocus } from "react-navigation";


import ItemTask from "../../components/Tabs";

//fuentes
import {useFonts,Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

function TableroScreen({ uid,navigation, isFocused }) {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getTabs();
    }
  }, [isFocused]);


  async function getUser() {
    let unsubscribe = null;
    const userId = uid || Fire.shared.uid;

    unsubscribe = await Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => {
        setUser(doc.data());

      });
  }


  const getTabs = async()=>{

    const userId = uid || Fire.shared.uid;

    let list= [];
    const response = await firebase
    .firestore()
    .collection("tabs")
    .where("uid", "==", userId)
    
    .get()
    response.forEach(document =>{
      let id = document.id
      let name = document.data().name
      let apellido = document.data().apellido
      let text = document.data().text
      let obj = {id, name, apellido, text}
      list.push(obj)

    })

    setPosts(list)
  }
  
  const deleteTab = async(props)=>{
    await firebase.firestore().collection("tabs").doc(props.id).delete();
    getTabs();
  }

 
  const renderTabs = ({item})=>(
    <ItemTask
      
      id={item.id}
      name={item.name}
      text = {item.text}
      deleteTab = {deleteTab}

    />

  );
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
          <Txt style={{ fontFamily: "Poppins_400Regular",}}>Mis tableros</Txt>
        </View>

      </Header>
      <Feed 
        data = {posts}
        renderItem={renderTabs}
        keyExtractor= {item => item.id}
        >

        </Feed>

      <HeaderDos>

        <Post onPress={() => navigation.navigate("nuevoTablero")}>

          <TitleDos style={{fontFamily: "Poppins_500Medium"}}>Crear un nuevo tablero {" "}<MaterialCommunityIcons name="table-plus" size={20}  /></TitleDos>

        </Post>
      </HeaderDos>
    </Container>
  )
}
export default withNavigationFocus(TableroScreen);

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
