import React, { useState, useEffect } from 'react'

import moment from "moment";
import 'moment/locale/es'
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
import { StyleSheet, Text, View, } from 'react-native'
import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons/";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigationFocus } from "react-navigation";
//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"
import { Video } from 'expo-av';


const ItemTask = (props) => {


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


        <Avatar source={{ uri: props.avatar }} />


        <Container>

          <Directionrow>
            <Header>
              <Name style={{ fontFamily: "Poppins_400Regular", }}>{props.name}{" "}{props.apellido}</Name>
              <View style={{ flexDirection: 'row', }}>
                <MaterialIcons name="location-on" size={15} style={{ color: '#87d396', }} />
                <Pais style={{ fontFamily: "Poppins_300Light", }}>{props.pais}</Pais>


              </View>

              <Etiquetas style={{ fontFamily: "Poppins_400Regular_Italic", }}>{props.selectedItemObjects}</Etiquetas>
              <Time style={{ fontFamily: "Poppins_300Light" }}>{moment(props.timestamp).fromNow()}</Time>


            </Header>
            <View style={{ marginLeft: -30 }}>
              <TouchableOpacity onPress={props.passTo.bind(this, props)}>
                <Feather name="plus-circle" color="#2ed34f" size={24} />

              </TouchableOpacity>
            </View>
          </Directionrow>

          <DescriptionText style={{ fontFamily: "Poppins_400Regular" }}>{props.text}</DescriptionText>


          {(props.imagestate).toString().endsWith("jpg") ?

            <ImagePost source={{ uri: props.imagestate }} resizeMode="cover" />

            :
            <Video
              source={{ uri: props.imagestate }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping={false}
              useNativeControls
              style={{
                width: 315,
                height: 450,
                borderRadius: 5,
                margin: 2,
                
                right: 50
              }}
            />

          }

          <Footer>


          </Footer>
        </Container>

      </FeedItem>



    </View>

  );

}
export default ItemTask;

