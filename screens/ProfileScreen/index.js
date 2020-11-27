import React, { useState, useEffect, useRef } from "react";
import {
  View, LayoutAnimation, StyleSheet, SafeAreaView, Image, Text,
  StatusBar, ImageBackground, Alert, ScrollView, TouchableHighlightBase, Dimensions
} from "react-native";
import Modal from 'react-native-modalbox';
import { SwitchActions, withNavigationFocus } from "react-navigation";
import { FontAwesome5, Ionicons, FontAwesome, MaterialIcons, Fontisto, Entypo } from '@expo/vector-icons'
import { TouchableOpacity, TextInput, } from 'react-native-gesture-handler';

//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"


import { AppLoading } from "expo"


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import {
  Container,
  Title,
  LogoutButton,
  LogoutButtonText,
  Profile,
  Avatar,
  Feed,
  ImageBack
} from "./styles";



import * as firebase from "firebase";

import ItemTask from "../../components/Photos";

import Fire from "../../utils/Fire";
import { useGestureHandlerRef } from "react-navigation-stack";


function ProfileScreen({ uid, isFocused, navigation, }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState({});
  const modal1 = useRef();
  const swipeToClose = useRef(true);
  const passwordRef = useRef();
  const [countPost, setCountPost] = useState("")
  const [countTabs, setCountTabs] = useState("")

  const scrollViewRef = useRef()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [borderColor, setBorderColor] = useState(null);
  const [press, setPress] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [show, setShow] = useState(false);



  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getDocs();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      ViewCountPost();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      ViewCountTabs();
    }
  }, [isFocused]);

  //obtener usuario

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




  const getDocs = async () => {
    let list = [];
    const userId = Fire.shared.uid;

    const response = await firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", userId)
      .get()
    response.forEach(document => {
      let id = document.id
      let name = document.data().name
      let apellido = document.data().apellido
      let avatar = document.data().avatar
      let pais = document.data().pais
      let selectedItemObjects = document.data().selectedItemObjects
      let timestamp = document.data().timestamp
      let text = document.data().text
      let imagestate = document.data().imagestate
      let obj = { id, name, apellido, avatar, pais, selectedItemObjects, timestamp, text, imagestate }
      list.push(obj)

    })

    setPosts(list)
  }



  const renderTabs = ({ item }) => (
    <ItemTask

      id={item.id}
      name={item.name}
      apellido={item.apellido}
      avatar={item.avatar}
      pais={item.pais}
      selectedItemObjects={item.selectedItemObjects}
      timestamp={item.timestamp}
      text={item.text}
      imagestate={item.imagestate}

    />

  )

  LayoutAnimation.easeInEaseOut();

  function handleLogout() {
    firebase.auth().signOut();
  }

  function ViewCountPost() {
    const userId = uid || Fire.shared.uid;
    firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", userId)
      .get()
      .then(function (querySnapshot) {
        let count = querySnapshot.size
        count = String(count);
        setCountPost(count)
        return count
      });
  }

  function ViewCountTabs() {
    const userId = uid || Fire.shared.uid;
    firebase
      .firestore()
      .collection("tabs")
      .where("uid", "==", userId)
      .get()
      .then(function (querySnapshot) {
        let count = querySnapshot.size
        count = String(count);
        setCountTabs(count)
        return count
      });
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


  function scrollHastaElFinal() {

    scrollViewRef.current.scrollToEnd(true)
  };

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}
      ref={(scrollViewRef)}
      >


        <View style={{ alignSelf: "center" }}>
          <View style={styles.home}>
            <TouchableOpacity onPress={() => { navigation.navigate('Inicio') }}>
              <FontAwesome5 name="home" size={24} color="#87d396" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileImage}>

            <Image style={styles.image} resizeMode="center" source={{ uri: user.avatar }} />

          </View>


          <View style={styles.dm}>
            <TouchableOpacity onPress={handleLogout}>
              <FontAwesome5 name="sign-out-alt" size={12} color="#fff" />
            </TouchableOpacity>
          </View>


          <View style={styles.add}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('editScreen') }}>
              <FontAwesome5 name="user-edit" size={18} color="#fff" style={{ marginTop: 1, marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.textdos, { fontWeight: "200", fontSize: 36 }]}>{user.name}{" "}{user.apellido}</Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="location-on" size={15} style={{ color: '#87d396' }} />
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.pais}</Text>

          </View>

          <Text style={[styles.desc, { fontSize: 14 }]}>{user.desc}</Text>

        </View>
        <View style={styles.statsContainer}>

          <View style={styles.statsBox}>

            <TouchableOpacity onPress={() => { navigation.navigate('tableros') }}>
              <Text style={[styles.text, { fontSize: 24 }]}>{countTabs}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('tableros') }}>

              <Text style={[styles.text, styles.subText]}>Tableros</Text>

            </TouchableOpacity>

          </View>


          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <TouchableOpacity 
         onPress={scrollHastaElFinal}
            >

              <Text style={[styles.text, { fontSize: 24 }]}>{countPost}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={scrollHastaElFinal}>
              <Text style={[styles.text, styles.subText]}>Publicaciones</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ marginTop: 32 }}>
          <View style={styles.searchSection}>

            <Text style={styles.input}>Mis tableros {"           "}
              <FontAwesome name="table" size={24}
                color="#87d396" />
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('tableros') }}>

              <MaterialCommunityIcons style={styles.iconPro}
                name="table-large-plus" size={24} color="#87d396" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchSection}>

            <Text style={styles.input}>Mis publicaciones {""}
              <Fontisto name="photograph" size={24}
                color="#87d396"
              />
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('postModal') }}>

              <FontAwesome5 name="plus-circle" size={24} style={styles.iconPro}
                color="#87d396"
              />
            </TouchableOpacity>
          </View>
          <ImageBack source={require("../../assets/no.png")}>

            <Feed
              horizontal={true}
              data={posts}
              renderItem={renderTabs}
              keyExtractor={item => item.id}
            >

            </Feed>

          </ImageBack>
        </View>

      </ScrollView>
    </SafeAreaView>

  );
}

export default withNavigationFocus(ProfileScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "Poppins_300Light",
    color: "#52575D"
  },

  desc: {
    fontFamily: "Poppins_600SemiBold",
    color: "#72ba83",
    margin: 20,

  },
  textdos: {
    fontFamily: "Poppins_400Regular",
    color: "#52575D"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden"
  },


  add: {
    backgroundColor: "#87d396",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 2
  },


  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },

  dm: {
    backgroundColor: "#87d396",
    position: "absolute",
    top: 20,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  home: {

    position: "absolute",
    left: -100,
    bottom: 110,
    width: 45,
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
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
    fontSize: 15,
    color: '#87d396',
    fontFamily: "Poppins_300Light",

  },
  iconPro: {
    paddingRight: 10,
    paddingLeft: 8,
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
});
