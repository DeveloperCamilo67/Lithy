import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Modal,
  Dimensions
} from "react-native";
import { withNavigationFocus } from "react-navigation";

import * as firebase from "firebase";


import {useFonts,Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

require("firebase/firestore");
import Fire from "../../utils/Fire";
import { Container, Title, Feed } from "./styles";
import { MaterialCommunityIcons, FontAwesome5, Ionicons, Entypo, FontAwesome } from 'react-native-vector-icons/';
import Post from "../../components/SearchPost";

import ItemTask from "../../components/SearchPost";

function MessagesCreen({ isFocused, navigation }) {

  const categories = [
    {
      name: '#Lithy',
      icon: <MaterialCommunityIcons name="leaf" style={{ marginRight: 5, color: '#2ed34f' }} size={18} />,
    },
    {
      name: '#Ejercicios',
      icon: <FontAwesome5 name="weight" style={styles.chipsIcon} size={18} />,
    },
    {
      name: '#ComidaSaludable',
      icon: <MaterialCommunityIcons name="food-off" style={styles.chipsIcon} size={18} />,
    },
    {
      name: '#VidaSana',
      icon: <MaterialCommunityIcons name="heart" style={styles.chipsIcon} size={18} />,
    },
    {
      name: '#Dietas',
      icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-apple" size={18} />,
    },
    {
      name: '#Bienestar',
      icon: <FontAwesome5 name="hand-holding-heart" style={styles.chipsIcon} size={18} />,
    },
    {
      name: '#SoySaludable',
      icon: <Entypo name="emoji-happy" style={styles.chipsIcon} size={18} />,
    },
    {
      name: '#QuemaCalorias',
      icon: <FontAwesome5 name="burn" style={styles.chipsIcon} size={18} />,
    },

  ]
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getDocs();
    }
  }, [isFocused]);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    let unsubscribe = null;
    const userId = Fire.shared.uid;

    unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => {
        setUser(doc.data());
      });
    //console.tron.log(user);
  }

  const getDocs = async()=>{
    let list= [];
 
    const response = await firebase
    .firestore()
    .collection("posts")
    .orderBy("timestamp", "desc")
    .get()
    response.forEach(document =>{
      let id = document.id
      let name = document.data().name
      let apellido = document.data().apellido
      let avatar = document.data().avatar
      let pais = document.data().pais
      let selectedItemObjects = document.data().selectedItemObjects
      let timestamp = document.data().timestamp
      let text = document.data().text
      let imagestate = document.data().imagestate
      let obj = {id, name, apellido, avatar, pais,selectedItemObjects, timestamp, text, imagestate}
      list.push(obj)

    })

    setPosts(list)
  }

  
 
  const renderTabs = ({item})=>(
    <ItemTask
      
      id={item.id}
      name={item.name}
      apellido={item.apellido}
      avatar={item.avatar}
      pais={item.pais}
      selectedItemObjects={item.selectedItemObjects}
      timestamp={item.timestamp}
      text = {item.text}
      imagestate = {item.imagestate}
    

    />
  
  )

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
    <View style={styles.container}>
      <View style={styles.containerTwo}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar"
            placeholderTextColor="gray"
            autoCapitalize="none"
            style={{ flex: 1, padding: 0, fontFamily: 'Poppins_300Light'}}
          />
          <Ionicons name="ios-search" size={28} />
        </View>

        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={50}
          style={styles.chipsScrollView}
          contentInset={{ // iOS only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 20 : 0
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.chipsItem}>
              {category.icon}
              <Text style={styles.textIcon}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>

      <Feed 
        
        data = {posts}
        renderItem={renderTabs}
        keyExtractor= {item => item.id
        
        }
        numColumns={2}
        
        >

        </Feed>

    </View>
  );
}

export default withNavigationFocus(MessagesCreen);

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const margin = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  chipsIcon: {
    marginRight: 5,
  },
  containerTwo: {
    flex: 1,
    height: 150,
    marginBottom: 130,
  },
  image: {
    height: 120,
    width: '100%',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    resizeMode: 'contain',

  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',

  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10
  },
  chipsIcon: {
    marginRight: 5,
  },
  textIcon: {
    color: '#000',
    fontFamily:"Poppins_400Regular_Italic"
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});