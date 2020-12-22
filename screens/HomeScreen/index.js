import React, { useState, useEffect, useRef } from "react";
import { withNavigationFocus } from "react-navigation";

import { Container, Header, Title, Feed, Image, ImageBack } from "./styles";

import * as firebase from "firebase";

require("firebase/firestore");
import Fire from "../../utils/Fire";

import ItemTask from "../../components/Posts";
import { RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
function HomeScreen({ isFocused, navigation }) {
  const [posts, setPosts] = useState([]);
  const [postsdos, setPostsdos] = useState([]);

  const [user, setUser] = useState({});
  const scrollViewRef = useRef()
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getDocs();
    }
  }, [isFocused]);




  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    scrollHastaElFinal();
  }, [isFocused]);

  function refresh() {
    setIsFetching(true)
    setTimeout(() => {
      setIsFetching(false)
      getDocs();

    }, 2500);
  }

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

  const getDocs = async () => {
    let list = [];

    const response = await firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
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
      let likes = document.data().likes

      let obj = {
        id, name, apellido, avatar,
        pais, selectedItemObjects, timestamp, text, imagestate, likes,
      }
      list.push(obj)

    })

    setPosts(list)
  }


  const deleteTab = async (props) => {
    //await firebase.firestore().collection("posts").doc(props.id).delete();
    const increment = firebase.firestore.FieldValue.increment(1);

    await firebase.firestore().collection("posts").doc(props.id).update({

      likes: increment,

    });
    getDocs();

  }

  const comentar = async (props) => {

    await firebase.firestore().collection("posts").doc(props.id).update({

      comentario: "buena onda",

    });


  }



  const passTo = async (props) => {

    navigation.navigate("taba")


  }

  const GuardarEnTablero = async (props) => {
    await firebase.firestore().collection("tabs").doc(props.id).delete();

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
      likes={item.likes}
      passTo={passTo}
      deleteTab={deleteTab}
      GuardarEnTablero={GuardarEnTablero}
      comentar={comentar}


    />

  )
  const scrollHastaElFinal = () => {

    scrollViewRef.current?.scrollToOffset({

      animated: true,
    });
  };

  return (

    <Container>

      <TouchableOpacity
        activeOpacity={1}
        onPress={scrollHastaElFinal}
      >


        <Header>
          <Image
            source={require('../../assets/Picture7.png')}
          >
          </Image>
        </Header>
      </TouchableOpacity>
      <Feed

        showsVerticalScrollIndicator={false}

        data={posts}
        renderItem={renderTabs}
        keyExtractor={item => item.id}
        ref={(scrollViewRef)}
        refreshControl={

          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refresh()}
            progressBackgroundColor="#fff"
            colors={['#56e773', '#56cfe7', '#c856e7']}

          >

          </RefreshControl>
        }
      >

      </Feed>


    </Container>


  );
}


export default withNavigationFocus(HomeScreen);
