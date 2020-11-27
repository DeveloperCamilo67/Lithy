import React, { useRef, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
  KeyboardAvoidingView, SafeAreaView,
  Image, ScrollView, LayoutAnimation, ImageBackground, Button, Alert
} from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import { AvatarPlaceholder, Avatar } from "./styles";
import { LookupModal } from "react-native-lookup-modal";
import Fire from "../../utils/Fire";
import * as firebase from "firebase";
import { Kohana } from 'react-native-textinput-effects';

//fuentes
import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

import Country from '../../components/Countries'

import UserPermissions from "../../utils/userPermissions";
import * as ImagePicker from "expo-image-picker";

import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { color } from "react-native-reanimated";

export default function RegisterScreen({ navigation }) {



  const apellidoRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const [scroll, setScroll] = useState(true)

  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState(" ");
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [borderColor, setBorderColor] = useState(null);
  const [press, setPress] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDos, setShowAlertDos] = useState(false);
  const [showAlertTres, setShowAlertTres] = useState(false);
  const [pais, setPais] = useState(<Text style={[styles.textInput, { color: "gray" }]}>  Selecciona tu país</Text>);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit() {
    const user = {
      name,
      apellido,
      email,
      desc,
      password,
      avatar,
      pais,
    };

    if ((name).length == "" || (apellido).length == "" || (email).length == ""
      || (password).length == "") {

      handleOpen();

    } else {
      Fire.shared.createUser(user);

    }



  }

  const handleClose = () => {
    setShowAlert(false)
  }
  const handleOpen = () => {
    setShowAlert(true)
  }
  const handleCloseDos = () => {
    setShowAlertDos(false)
  }
  const handleOpenDos = () => {
    setShowAlertDos(true)
  }

  const handleCloseTres = () => {
    setShowAlertTres(false)
  }
  const handleOpenTres = () => {

    UserPermissions.getCameraPermission();

    setShowAlertTres(true)

  }


  async function handlePickAvatar() {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10]
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
      handleCloseTres();
    }
  }

  async function handlepickGaleria() {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
      handleCloseTres();

    }
  }


  const verContra = () => {
    if (press == false) {
      setShowPass(false)
      setPress(true)
    } else {
      setShowPass(true)
      setPress(false)
    }
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



  LayoutAnimation.easeInEaseOut();

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.text}>¡Regístrate para comenzar!</Text>

      <View style={styles.sectionuno}>

        <TouchableOpacity style={styles.avatarPlaceholder} onPress={handleOpenTres}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <MaterialCommunityIcons name="camera-plus" size={42} color="#87d396" style={{ justifyContent: 'center', alignItems: 'center', }}>
          </MaterialCommunityIcons>
        </TouchableOpacity>

      </View>

      <View style={styles.action}>

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
            returnKeyType="next"
            onSubmitEditing={() => apellidoRef.current.focus()}
            value={name}
            onChangeText={setName}
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


            useNativeDriver
            returnKeyType="next"
            ref={apellidoRef}
            onSubmitEditing={() => emailRef.current.focus()}
            value={apellido}
            onChangeText={setApellido}
          />

        </View>

        <View style={styles.section}>
        <Kohana
            style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
            label={'Correo electrónico'}
            iconClass={FontAwesome5}
            iconName={'envelope'}
            iconColor={'#87d396'}
            inputPadding={5}
            labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}


            useNativeDriver
            keyboardType="email-address"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

        </View>

        <View style={styles.section}>
          <MaterialIcons name="location-on" size={28}
            color='#87d396' />
          <Text style={styles.welcome}>{pais}</Text>

          <LookupModal

            data={Country}
            value={pais}
            selectText={"Seleccione"}
            placeholder={"Busca tu país..."}

            onSelect={item => {
              setPais(item.name);
            }}

            selectButtonTextStyle={{
              backgroundColor: '#FFF',
              color: "#87d396",


            }}
            selectButtonStyle={{
              backgroundColor: '#FFF',


            }}
            displayKey={"name"}

            hideSelectButton={false}
            itemStyle={{ backgroundColor: "#fff" }}
            itemTextStyle={{ color: "#000" }}
            contentStyle={{ backgroundColor: "#fff", maxHeight: 250, }}

          />


        </View>

        <View style={styles.section}>
        <Kohana
            style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
            label={'Contraseña'}
            iconClass={FontAwesome5}
            iconName={'lock'}
            iconColor={'#87d396'}
            inputPadding={5}
            labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}


            useNativeDriver
            secureTextEntry={showPass}
            ref={passwordRef}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
          />

         
          <TouchableOpacity style={styles.btnEye}
            onPress={verContra.bind()}
          >
            <FontAwesome5 name={press == false ? 'eye' : 'eye-slash'}
              size={25} color={borderColor == "password" ? '#87d396' : '#87d396'} />
          </TouchableOpacity>

        </View>

      </View>

      <TouchableOpacity style={styles.login} onPress={handleSubmit}
      >

        <View style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>


          <Text style={styles.textLogin}>Registrarse
      </Text>

        </View>

      </TouchableOpacity>
      <View style={styles.singup}>
        <Text style={[styles.textSingup, {
          color: 'gray'
        }]}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}

        >
          <Text style={[styles.textSingup, {
            color: '#87d396',
            marginLeft: 3
          }]}>¡Inicia sesión!</Text>
        </TouchableOpacity>

      </View>
      <SCLAlert
        theme="warning"
        show={showAlert}
        title="¡Cuidado!"
        subtitle="Existen campos en vacío, verifique"
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
        show={showAlertTres}
        title="¿Que quieres hacer?"
        titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize: 24 }}
        subtitle="Selecciona una opción"
        cancellable={true}
        onRequestClose={handleCloseTres}
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
          onPress={handleCloseTres}>
          Cancelar
                </SCLAlertButton>
      </SCLAlert>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100
  },
  title: {
    color: '#87d396',
    fontFamily: "Poppins_600SemiBold",
    fontSize: 30
  },
  text: {
    color: 'gray',
    fontFamily: "Poppins_300Light",
  },
  section: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor:'#d7dbdd',
    marginTop: 10
  },
  welcome: {
    flex: 1,
    paddingLeft: 10,
    fontSize:16,
    
    fontFamily: "Poppins_700Bold",
  },
  sectionuno: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "Poppins_300Light",
  },

  textLogin: {
    color: 'white',
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  login: {
    width: '100%',
    height: 40,
    backgroundColor: '#87d396',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 50
  },
  singup: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSingup: {
    textAlign: 'center',
    fontFamily: "Poppins_300Light",
  },
  icon: {
    color: '#fff',
    marginLeft: 20

  },
  ActivityIndicatorStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 70,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: "#bc3030",
    fontSize: 12,
    marginLeft: 12,
    fontWeight: "bold",
    fontStyle: 'italic'
  },
  btnEye: {
    position: 'absolute',

    right: 10
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 400 / 2,
    borderColor: '#87d396',
    borderWidth: 2,
    position: 'relative',
    marginLeft: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 400 / 2,
    borderColor: '#87d396',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'

  }

})
