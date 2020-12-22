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
  ViewPhoto,
  Etiquetas
} from "./styles";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { ImageBackground, View, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av';

import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons/";

const ItemTaskVideo = (props) => {

  const handleClose = () => {
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true)
  }

  const [show, setShow] = useState(false);
  return (


    <FeedItem>


      <Container>

        {(props.imagestate).includes(".mp4") ?
          <View>

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
                width: 320,
                height: 377,
                borderRadius: 5,
                marginTop: -25,

              }}

            />
            <TouchableOpacity style={{
               backgroundColor: "#87d396",
               position: "absolute",
               top: 0,
               width: 30,
               height: 30,
               right:7,
               borderRadius: 20,
               alignItems: "center",
               justifyContent: "center"
            }}
            onPress={handleOpen}
            >
                 <FontAwesome5 name="trash-alt" size={18} color="#fff"
              style={{ position: 'absolute', top: 5, right:8 }}

              />

            </TouchableOpacity>

          </View>


          :
          null

        }

      </Container>
      <SCLAlert
          theme="danger"
          show={show}
          title={"Eliminar este video"}
          subtitle="¿Estás seguro de eliminar este video?"
          cancellable={true}
          onRequestClose={handleClose}
          subtitleStyle={{ fontSize: 17, fontFamily: "Poppins_300Light", }}
          titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize:18 }}
          headerIconComponent={<FontAwesome5 name="trash-alt" size={35} color="#FFF" />}
        >
          <SCLAlertButton theme="danger" onPress={props.deletePost.bind(this, props)}>Si, estoy seguro</SCLAlertButton>
          <SCLAlertButton theme="danger" onPress={handleClose}>Cancelar</SCLAlertButton>

        </SCLAlert>
    </FeedItem >
  );
}

export default ItemTaskVideo;