import React, { useEffect, useState } from "react";

import { Container, Title } from "./styles";
import { View, Text, StatusBar } from "react-native";

import * as firebase from "firebase";

import AnimatedSplash from "./lib/AnimatedSplash";

export default function LoadingScreen({ navigation }) {
 
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
      setIsLoaded(true);
      firebase.auth().onAuthStateChanged(user => {
        navigation.navigate(user ? "App" : "Auth");
      });
    }, 100)
   
  }, []);

  return (
    <>
  
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
    <AnimatedSplash
      logoWidht={300}
      logoHeight={300}
      isLoaded={isLoaded}
      backgroundColor={"#fff"}
      logoImage={require("../../assets/newlogo.png")}
    
    >

    </AnimatedSplash>

 
   
  </>
  
  );
}