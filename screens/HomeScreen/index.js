import React, { useState, useEffect } from "react";
import { withNavigationFocus } from "react-navigation";

import { Container, Header, Title, Feed, Image, ImageBack } from "./styles";

import * as firebase from "firebase";

require("firebase/firestore");
import Fire from "../../utils/Fire";

import ItemTask from "../../components/Posts";

function HomeScreen({ isFocused, navigation }) {
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
      let obj = { id, name, apellido, avatar, pais, selectedItemObjects, timestamp, text, imagestate }
      list.push(obj)

    })

    setPosts(list)
  }


  const deleteTab = async (props) => {
    await firebase.firestore().collection("posts").doc(props.id).delete();
    getDocs();
  }

  const passTo = async (props) => {
    navigation.navigate("taba")
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
      passTo={passTo}

    />

  )

  return (

    <Container>

      <Header>
        <Image
          source={require('../../assets/Picture7.png')}
        >
        </Image>
      </Header>

      <Feed

        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={renderTabs}
        keyExtractor={item => item.id}
      >

      </Feed>



    </Container>


  );
}


export default withNavigationFocus(HomeScreen);
