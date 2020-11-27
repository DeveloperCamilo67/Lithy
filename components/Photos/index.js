import React from "react";
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

import { ImageBackground, View } from 'react-native'
import { Video } from 'expo-av';

import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons/";

const ItemTask = (props) => {

  return (


    <FeedItem>


      <Container>

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
              width: undefined,
              height: 450,
              borderRadius: 5,
              margin: 2,
            }}
          />

        }

      </Container>

    </FeedItem>
  );
}

export default ItemTask;