import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, ScrollView, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons/";

import {
  Container,
  Header,
  Post,
  Title,
  BackButton,
  InputContainer,
  Avatar,
  TextInputContainer,
  Photo,
  ViewPhoto,
  ImageState,
  Txt,

} from "./styles";
import styled from "styled-components";
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../../utils/Fire";


//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"
import { set } from "react-native-reanimated";

const firebase = require("firebase");
require("firebase/firestore");



export default function PostScreen({ navigation }) {


  const items = [
    {
      title: 'Seleccione etiquetas',
      id: 0,

      children: [
        {
          title: '#VidaSana',
          id: 1
        },
        {
          title: '#Lithy',
          id: 2
        },
        {
          title: '#ComidaSana',
          id: 3
        },
        {
          title: '#Ejercicios',
          id: 4
        },
        {
          title: '#Frutas',
          id: 5
        },
        {
          title: '#Ensaladas',
          id: 6
        },
        {
          title: '#Rutinas',
          id: 7
        },
        {
          title: '#DiaAdia',
          id: 8
        },
        {
          title: '#MiReceta',
          id: 9
        },

        {
          title: '#ComidaSaludable',
          id: 10
        },
        {
          title: '#Dietas',
          id: 11
        },
        {
          title: '#Bienestar',
          id: 12
        },
        {
          title: '#SoySaludable',
          id: 13
        },
        {
          title: '#MeGustaLithy',
          id: 14
        },
        {
          title: '#DiaProductivo',
          id: 15
        },
        {
          title: '#MiPost',
          id: 16
        },
        {
          title: '#SiempreLithy',
          id: 17
        },
        {
          title: '#Desayuno',
          id: 18
        },





      ]
    },

  ]


  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  const [text, setText] = useState("");
  const [imagestate, setImageState] = useState("");



  const [showAlert, setShowAlert] = useState(false);


  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [likes, setLikes] = useState(0);
  const [selectedItems, setSelectedItems] = useState("");
  const [selectedItems2, setSelectedItems2] = useState("");
  const [selectedItemObjects, setSelectedItemObjects] = useState([]);
  const [showDropDowns, setShowDropDowns] = useState(false);
  const [maxItems, setMaxItems] = useState(5);


  //Obtener usuario
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    let unsubscribe = null;
    const userId = Fire.shared.uid;

    unsubscribe = await Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => {
        setUser(doc.data());
      });
    // console.tron.log(user);
  }
  //Obtener permisos
  useEffect(() => {
    getPhotoPermission();
  }, []);
  useEffect(() => {
    getAudioPermission();
  }, []);
  //pretendLoad
  useEffect(() => {
    pretendToLoad();
  }, []);

  async function pretendToLoad() {
    setLoader(true)
    
    setTimeout(() => {
      setLoader(false, items)
    }, 2500)
  }

  function renderSelectText() {



    return <Text style={{ color: '#87d396', fontSize: 24, fontFamily: "Poppins_400Regular" }}>Selecciona #etiquetas</Text>
  }


  function onSelectedItemsChange(selectedItems) {

    if (selectedItems.length >= maxItems) {
      if (selectedItems.length === maxItems) {
        setSelectedItems(selectedItems)
      }

      ({ maxItems: true })

      return
    }
    ({ maxItems: false })


    const filteredItems = selectedItems.filter(
      val => !selectedItems2.includes(val)

    )
    setSelectedItems(filteredItems)

  }


  function onSelectedItemObjectsChange(selectedItemObjects) {
    setSelectedItemObjects(selectedItemObjects.map(x => x.title).join(' '))


  }

  const noResults = () => {
    return (
      <View key="a" style={styles.center}>
        <Text style={{fontSize: 18, fontFamily: "Poppins_400Regular" }}>No hay más resultados... 😥</Text>
      </View>
    );
  };

  async function getPhotoPermission() {
    if (Contants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status != "granted") {
        Alert.alert("Necesitamos que acepte los permisos para utilizar Lithy");
      }
    }
  }
  async function getAudioPermission() {
    if (Contants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status != "granted") {
        Alert.alert("Necesitamos que acepte los permisos para utilizar Lithy");
      }
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [6, 8]
    });
    if (!result.cancelled) {
      setImageState(result.uri);
      handleClose();

    }
  }

  async function pickVideo() {
    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [6, 8]
    });
    if (!result.cancelled) {
      setImageState(result.uri);
      handleClose();


    }
  }

  async function pickGaleria() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [6, 8]
    });
    if (!result.cancelled) {
      setImageState(result.uri);
      handleClose();



    }
  }

  function handlePost() {
    setLoading(true);

    Fire.shared
      .addPost({
        name: user.name,
        apellido: user.apellido,
        text,
        pais: user.pais,
        likes,
        selectedItemObjects,
        localUri: imagestate,
        uri: user.avatar,
      })
      .then(ref => {

        setText();
        
        setImageState("");
        navigation.navigate("Inicio");
        setLoading(false);
      })
      .catch(error => {
        alert(error);
      })
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

  const handleClose = () => {
    setShowAlert(false)
  }
  const handleOpen = () => {
    setShowAlert(true)
  }


  function borrar() {
    setImageState("");
    setText("");


    navigation.goBack()
  }

 
  return (

    <Container>
      <Header>

        <BackButton onPress={borrar}>
          <FontAwesome5 name="arrow-left" size={24} color="#87d396"
        
          />

        </BackButton>
        <View>
          <Txt style={{ fontFamily: "Poppins_400Regular" }}>Crear una publicación</Txt>
        </View>

      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <InputContainer>
          <Avatar source={{ uri: user.avatar }} />
          <TextInputContainer
            multiline={true}
            numberOfLine={4}
            autoFocus={true}
            placeholder="Describe tu publicación"
            onChangeText={setText}
            value={text}
            style={{ fontFamily: "Poppins_300Light" }}
          />

          <Photo onPress={handleOpen}>
            <FontAwesome5 name="camera" size={32} color="#87d396" />
          </Photo>
        </InputContainer>


        <SectionedMultiSelect
          items={items}
          uniqueKey="id"
          subKey="children"
          displayKey="title"
          iconKey="icon"
          autoFocus
          searchPlaceholderText="Buscar etiqueta..."
          modalWithTouchable
          modalWithSafeAreaView
          removeAllText="Borrar todo"
          loading={loader}
          IconRenderer={Icon}
          chipsPosition="top"

          renderSelectText={renderSelectText} //se queda

          noResultsComponent={noResults}  //se queda
          showDropDowns={showDropDowns} // se quedaaa
          animateDropDowns={false}

          showRemoveAll={false}

          onSelectedItemsChange={onSelectedItemsChange}
          onSelectedItemObjectsChange={onSelectedItemObjectsChange}

          colors={{ primary: '#87d396', success: '#2ed34f' }}
          itemNumberOfLines={3}
          selectLabelNumberOfLines={3}


          confirmText={`${selectedItems.length}/${maxItems} - ${maxItems ? 'Aceptar' : 'Aceptar'
            }`}


          selectedItems={selectedItems}
          styles={{
            item: {
              paddingHorizontal: 10,
            },


            chipText: {
              color: '#000',
              fontFamily: 'Poppins_200ExtraLight_Italic'

            },
            chipContainer: {
              backgroundColor: '#fff',
              borderColor: '#000',
              marginLeft: 12,


            },


            subItem: {
              paddingHorizontal: 10,
            },
            selectToggle: {
              paddingHorizontal: 10,
              marginLeft: 5,

            },
            selectedItem: {
              backgroundColor: '#87d396'
            },
            selectedSubItem: {
              backgroundColor: '#d0f5d7'
            },
            scrollView: { paddingHorizontal: 0, }
          }}
        />

        <ViewPhoto>

          {imagestate.toString().endsWith("jpg") ?

            <ImageState source={{ uri: imagestate }} />


            :
            <Video
              source={{ uri: imagestate }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={true}
              isLooping={true}
              useNativeControls
              style={{ width: undefined, height: 450,
                borderRadius: 5}}
            />

          }

        </ViewPhoto>

       
      </ScrollView>
      <Header>
        <View>

        </View>
        <Post onPress={handlePost} disable={loading} disabled={imagestate === ''}
          style={[

            {
              backgroundColor:
           
                    imagestate === ''
                    ? '#b5d3bb'
                    : '#87d396'
                
            },
          ]}
        >
          {loading ? (
            <Loading />
          ) : (
              <Title style={{ fontFamily: "Poppins_500Medium" }}>Publicar {" "}<FontAwesome5 name="upload" size={15} /></Title>
            )}
        </Post>
      </Header>
      <SCLAlert
        theme="info"
        show={showAlert}
        title="¿Que quieres publicar?"
        titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize:22 }}
        subtitle="Selecciona una opción"
        cancellable={true}
        onRequestClose={handleClose}
        subtitleStyle={{
          fontSize: 18, fontFamily: "Poppins_300Light",
        }}
        headerIconComponent={<FontAwesome5 name="file-upload" size={35} color="#FFF" />}

      >
        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
          onPress={pickImage}>
          Hacer una foto
        
                </SCLAlertButton>
        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold", }}
          onPress={pickVideo}>
          Hacer un video
                </SCLAlertButton>
        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
          onPress={pickGaleria}>
          Mi Galería
                </SCLAlertButton>
        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
          onPress={handleClose}>
          Cancelar
                </SCLAlertButton>
      </SCLAlert>
    </Container>
  )
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  label: {
    fontWeight: 'bold'
  },
  switch: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
})

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
