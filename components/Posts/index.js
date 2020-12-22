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
  Boton,
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

import * as firebase from "firebase";

require("firebase/firestore");
import Fire from "../../utils/Fire";

//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"
import { Kohana } from 'react-native-textinput-effects';

import { AppLoading } from "expo"
import { Video } from 'expo-av';
import ImageLoad from 'react-native-image-placeholder';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Title, Txt } from '../../screens/PostScreen/styles';

const ItemTask = (props) => {



  const mutear = () => {
    if (mute == false) {
      setMute(true)
      setBorderColor(true)
    } else {
      setMute(false)
      setBorderColor(false)
    }
  }


  const [comentario, setComentario] = useState("");

  const [visible, setVisible] = useState(false);

  const containerStyle = {
    backgroundColor: 'white', padding: 20,
    height: 460, width: 320, left: 5, marginBottom: 50,

    borderBottomStartRadius: 1,
    borderBottomEndRadius: 60,
    borderTopStartRadius: 60,
  };



  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [borderColor, setBorderColor] = useState(false);
  const [mute, setMute] = useState(false);
  const [press, setPress] = useState(false);

  const [fontsLoaded, error] = useFonts({
    Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function onFocus(value) {

    setBorderColor(value)
  }


  return (

    <View>


      <FeedItem
        style={{
          borderTopEndRadius: 1,
          borderBottomStartRadius: 1,
          borderBottomEndRadius: 70,
          borderTopStartRadius: 150 / 2,
          borderWidth: 0.5,
          borderColor: '#87d396'


        }}>


        <Avatar
          style={{
            borderColor: '#87d396',
            borderWidth: 1.6,

            borderRadius: 150 / 2,


          }}
          source={{ uri: props.avatar }} />


        <Container>

          <Directionrow>
            <Header>

              <View style={{ flexDirection: 'row' }}>
                <Name style={{ fontFamily: "Poppins_400Regular", }}>{props.name} </Name>
                <Name style={{ fontFamily: "Poppins_400Regular", }}>{props.apellido}</Name>

              </View>



              <View style={{ flexDirection: 'row', }}>
                <MaterialIcons name="location-on" size={15} style={{ color: '#87d396', }} />
                <Pais style={{ fontFamily: "Poppins_300Light", }}>{props.pais}</Pais>


              </View>

              <Etiquetas style={{ fontFamily: "Poppins_400Regular_Italic", }}>{props.selectedItemObjects}</Etiquetas>
              <Time style={{ fontFamily: "Poppins_300Light" }}>{moment(props.timestamp).fromNow()}</Time>


            </Header>

            <View style={{ marginLeft: -30 }}>
              <TouchableOpacity onPress={props.passTo.bind(this, props.image)}>
                <Feather name="plus-circle" color="#2ed34f" size={24} />

              </TouchableOpacity>

            </View>


          </Directionrow>

          <DescriptionText style={{ fontFamily: "Poppins_400Regular" }}>{props.text}</DescriptionText>



          {

            (props.imagestate).includes(".jpg") ?

              <ImagePost
                style={{

                  width: 315,
                  height: 450,
                  borderRadius: 10,
                  borderTopRightRadius: 1,
                  borderTopLeftRadius: 70,
                  borderBottomRightRadius: 70,
                  borderBottomLeftRadius: 1,
                  margin: 2,
                  right: 53
                }}

                source={{ uri: props.imagestate }}
              />



              :
              <View>
                <Video
                  source={{ uri: props.imagestate }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={mute}
                  resizeMode="cover"
                  shouldPlay={false}
                  isLooping={false}
                  useNativeControls
                  style={{
                    width: 315,
                    height: 450,
                    borderRadius: 10,
                    margin: 2,
                    borderTopRightRadius: 1,
                    borderTopLeftRadius: 70,
                    borderBottomRightRadius: 30,
                    borderBottomLeftRadius: 1,

                    right: 53
                  }}
                />
                <View style={{ position: 'absolute', top: 10, left: 220 }}>
                  <TouchableOpacity
                    onPress={mutear.bind()}
                  >
                    <FontAwesome5
                      name={mute == false ? 'volume-up' : 'volume-mute'}
                      size={28} color={borderColor == false ? '#87d396' : '#c15bdd'}

                    />

                  </TouchableOpacity>

                </View>
              </View>



          }



          <Footer style={{ right: 50 }}>
            <TouchableOpacity style={{
              backgroundColor: "#fff",



            }}
              onPress={props.deleteTab.bind(this, props)}
            >
              <FontAwesome5 name={press == false ? 'envira' : 'envira'}
                size={30}
                color={'#87d396'}

              />

            </TouchableOpacity>


            <Name style={{
              fontFamily: "Poppins_400Regular", fontSize: 15, top: 10,
              left: 6
            }}>{(props.likes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Name>


          </Footer>
        </Container>





      </FeedItem>



    </View>

  );

}
export default ItemTask;

