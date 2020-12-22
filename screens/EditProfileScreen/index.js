import React, { useState, useEffect, useRef } from "react";
import {
  View, LayoutAnimation, StyleSheet, SafeAreaView, Image, Text,
  StatusBar, ImageBackground, Alert, ScrollView
} from "react-native";
import Modal from 'react-native-modalbox';
import { SwitchActions, withNavigationFocus } from "react-navigation";
import { FontAwesome5, AntDesign, Ionicons, FontAwesome, MaterialIcons, Fontisto, Entypo } from '@expo/vector-icons'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import UserPermissions from "../../utils/userPermissions";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Constants from 'expo-constants';
import PostScreen from "../PostScreen";
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
  TitleDos,
  HeaderDos,
} from "./styles";

//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"


import { AppLoading } from "expo"
import Button from '../../components/Button'
import styled from "styled-components";
import * as firebase from "firebase";
import Photos from "../../components/Photos";
import { Fumi, Hideo, Kohana } from 'react-native-textinput-effects';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import Fire from "../../utils/Fire";
import { useGestureHandlerRef } from "react-navigation-stack";
// import LoadingScreen from "../LoadingScreen";

function EditProfileScreen({ uid, isFocused, navigation, }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState({});
  const modal1 = useRef();
  const swipeToClose = useRef(true);
  const apellidoRef = useRef();
  const descRef = useRef();
  const [countPost, setCountPost] = useState("")
  const [countTabs, setCountTabs] = useState("")

  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [desc, setDesc] = useState("");
  const [avatar, setAvatar] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [borderColor, setBorderColor] = useState(null);
  const [press, setPress] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [show, setShow] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertdos, setShowAlertdos] = useState(false);

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");


  //TODO: Ver contraseña
  const verContra = () => {
    if (press == false) {
      setShowPass(false)
      setPress(true)
    } else {
      setShowPass(true)
      setPress(false)
    }
  }

  //TODO: Refrezcar el usuario en sesion
  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);


  //TODO: Obtener usuario

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

  //TODO: Actualizar usuario
  function actualizarUser() {
    const user = {
      name,
      apellido,
      avatar,
      desc,
    };
    if ((name).length == "" || (apellido).length == "") {

      handleOpen();

    } else {
      Fire.shared.updateUser(user);
      navigation.goBack();
    }

  }

  async function handlePickAvatar() {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
      handleClosedos();

    }
  }
  async function handlepickGaleria() {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
      handleClosedos();

    }
  }


  LayoutAnimation.easeInEaseOut();

  const handleClose = () => {
    setShowAlert(false)
  }
  const handleOpen = () => {
    setShowAlert(true)
  }

  const handleClosedos = () => {
    setShowAlertdos(false)
  }
  const handleopendos = () => {
    setShowAlertdos(true)
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


  return (


    <Container>
      <Header>

        <BackButton onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="#87d396"
          />
        </BackButton>
        <View>
          <Txt style={{ fontFamily: "Poppins_300Light", }}>Actualizar mis datos</Txt>
        </View>

      </Header>


      <View style={{ alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
        <TouchableOpacity onPress={handleopendos}>

          <View style={styles.profileImage}>

            <Image style={styles.image} resizeMode="center" source={{ uri: user.avatar }} />
          </View>

        </TouchableOpacity>


        <View style={styles.add}>

          <FontAwesome5 name="exchange-alt" size={18} color="#87d396" />

        </View>


        <View style={styles.profileImage}>

          <Image style={styles.image} resizeMode="center" source={{ uri: avatar }} />
        </View>



      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 12 }}>
        <Txt style={{ color: "#87d396", fontFamily: "Poppins_400Regular", }}>Cambiar mi foto de perfil</Txt>

      </View>

      <View style={styles.section}>

        <Kohana
          style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
          label={'Mi nombre'}
          iconClass={FontAwesome5}
          iconName={'user-alt'}
          iconColor={'#87d396'}
          inputPadding={5}

          labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}

          useNativeDriver
          onChangeText={setName}
          maxLength={10}
          value={name}

          returnKeyType="next"
          onSubmitEditing={() => apellidoRef.current.focus()}

        />

      </View>

      <View style={styles.section}>

        <Kohana
          style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
          label={'Mi apellido'}
          iconClass={FontAwesome5}
          iconName={'user-tag'}
          iconColor={'#87d396'}
          inputPadding={5}
          labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}

          ref={apellidoRef}
          useNativeDriver
          value={apellido}
          onChangeText={setApellido}
          maxLength={10}

          returnKeyType="next"
          onSubmitEditing={() => descRef.current.focus()}

        />

      </View>

      <View style={styles.section}>

        <Kohana
          style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
          label={'Acerca de mi'}
          iconClass={FontAwesome5}
          iconName={'address-card'}
          iconColor={'#87d396'}
          inputPadding={5}
          labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}

          ref={descRef}
          useNativeDriver
          value={desc}
          maxLength={200}
          onChangeText={setDesc}
          returnKeyType="send"
          onSubmitEditing={actualizarUser}
        />

      </View>



      <HeaderDos>

        <Post disable={loading} onPress={actualizarUser}>
          {loading ? (
            <Loading />
          ) : (
              <TitleDos>Actualizar{" "}<FontAwesome5 name="user-check" size={15} /></TitleDos>

            )}

        </Post>


      </HeaderDos>

      <SCLAlert
        theme="warning"
        show={showAlert}
        title="Por favor"
        subtitle="Ingresa tu nombre y apellido"
        cancellable={true}
        titleStyle={{ fontFamily: "Poppins_600SemiBold", }}
        subtitleStyle={{ fontSize: 17, fontFamily: "Poppins_300Light", }}
        onRequestClose={handleClose}
        headerIconComponent={<FontAwesome5 name="exclamation" size={35} color="#FFF" />}
      >
        <SCLAlertButton theme="warning"
          textStyle={{ color: "#FFF", fontFamily: "Poppins_600SemiBold", }}
          onPress={handleClose}>
          Aceptar
                    </SCLAlertButton>

      </SCLAlert>


      <SCLAlert
        theme="info"
        show={showAlertdos}
        title="¿Que quieres hacer?"
        titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize: 24 }}
        subtitle="Selecciona una opción"
        cancellable={true}
        onRequestClose={handleClosedos}
        subtitleStyle={{
          fontSize: 18, fontFamily: "Poppins_300Light",
        }}
        headerIconComponent={<FontAwesome5 name="file-upload" size={35} color="#FFF" />}

      >
        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
          onPress={handlePickAvatar}>
          Hacer una foto
                </SCLAlertButton>

        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
          onPress={handlepickGaleria}>
          Galería
                </SCLAlertButton>
        <SCLAlertButton
          theme="info"
          textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
          onPress={handleClosedos}>
          Cancelar
                </SCLAlertButton>
      </SCLAlert>

    </Container>

  );
}

export default withNavigationFocus(EditProfileScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "Poppins_300Light",
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

    overflow: "hidden",
    borderRadius: 400 / 2,
  },


  add: {
    backgroundColor: "#fff",
    top: 50,
    left: 2,
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
  section: {
    flexDirection: 'row',

    borderBottomWidth: 1,
    borderColor: '#d7dbdd',
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginLeft: 12,
    marginRight: 12,
    alignItems: 'center',
    marginTop: 10
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
  userUp: {
    maxHeight: 60,
    padding: 12,
    fontFamily: "Poppins_300Light",

  }
});
const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#fff",
  size: "small",
}))``;
