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
import { ImageBackground, View, TouchableOpacity, Text, } from 'react-native'
import { Video } from 'expo-av';

import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons/";

const ItemTask = (props) => {
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

        {(props.imagestate).includes(".jpg")?
          <View>


            <ImagePost source={{ uri: props.imagestate }} resizeMode="cover" />
            <TouchableOpacity style={{
               backgroundColor: "#87d396",
               position: "absolute",
               top: 0,
               width: 30,
               height: 30,
               right:15,
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
        title={"Eliminar esta foto"}
        subtitle="¿Estás seguro de eliminar esta foto?"
        cancellable={true}
        onRequestClose={handleClose}
        subtitleStyle={{ fontSize: 17, fontFamily: "Poppins_300Light", }}
        titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize: 18 }}
        headerIconComponent={<FontAwesome5 name="trash-alt" size={35} color="#FFF" />}
      >
        <SCLAlertButton theme="danger" onPress={props.deletePost.bind(this, props)}>Si, estoy seguro</SCLAlertButton>
        <SCLAlertButton theme="danger" onPress={handleClose}>Cancelar</SCLAlertButton>

      </SCLAlert>
    </FeedItem>
  );
}

export default ItemTask;