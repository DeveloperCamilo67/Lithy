import React, { useRef, useState } from "react";
import {
    StatusBar,
    Image,
    LayoutAnimation,
    TouchableOpacity,
    View, Text, StyleSheet, Alert, ScrollView

} from "react-native";
import { Button } from 'react-native-paper';
import { Container, Header, Title, Feed, Logo, LogoDos } from "./styles";
import { TextInput } from 'react-native-gesture-handler';
import { Kohana } from 'react-native-textinput-effects';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/red';

//fuentes
import {
    useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"

import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

import * as firebase from "firebase";

function LoginScreen({ navigation }) {
    const passwordRef = useRef();



    const [progreso, setProgreso] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [borderColor, setBorderColor] = useState(null);
    const [press, setPress] = useState(false);
    const [showPass, setShowPass] = useState(true);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertDos, setShowAlertDos] = useState(false);

    const verContra = () => {
        if (press == false) {
            setShowPass(false)
            setPress(true)
        } else {
            setShowPass(true)
            setPress(false)
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

    function onFocus(value) {

        setBorderColor(value)
    }

    function handleSubmit() {


        if ((email).length == "" || (password).length == "") {
           
            handleOpen();
          

        } else {

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(error => handleOpenDos());
               

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
        <ScrollView style={{ backgroundColor: "#FFF" }}>


            <View style={styles.container}>

                <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
                <View style={{ flexDirection: "row" }}>
                    <Logo
                        source={require('../../assets/Picture7.png')}
                    >
                    </Logo>
                    <LogoDos
                        source={require('../../assets/logo.png')}
                    >
                    </LogoDos>
                </View>


                <Text style={styles.title}>Iniciar Sesión</Text>
                <Text style={styles.text}>¡Inicia sesión con tu correo electrónico y contraseña!</Text>
                <View style={styles.action}>

                    <View style={[styles.section, {
                        borderColor: borderColor == "email" ? '#87d396' : '#d7dbdd'
                    }]}>
                        <Kohana
                            style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
                            label={'Correo electrónico'}
                            iconClass={FontAwesome5}
                            iconName={'envelope'}
                            iconColor={'#87d396'}
                            inputPadding={5}
                            labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}


                            useNativeDriver
                            blur
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current.focus()}
                            value={email}
                            onFocus={() => onFocus("email")}
                            onChangeText={setEmail}
                        />

                    </View>

                    <View style={[styles.section, {
                        borderColor: borderColor == "password" ? '#87d396' : '#d7dbdd'
                    }]}>

                        <Kohana
                            style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
                            label={'Contraseña'}
                            iconClass={FontAwesome5}
                            iconName={'lock'}
                            iconColor={'#87d396'}
                            inputPadding={5}
                            labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}


                            useNativeDriver
                            ref={passwordRef}
                            secureTextEntry={showPass}
                            returnKeyType="send"
                            value={password}
                            onFocus={() => onFocus("password")}
                            onChangeText={setPassword}
                            onSubmitEditing={handleSubmit}


                        />


                        <TouchableOpacity style={styles.btnEye}
                            onPress={verContra.bind()}
                        >
                            <FontAwesome5 name={press == false ? 'eye' : 'eye-slash'}
                                size={25} color={borderColor == "password" ? '#87d396' : '#d7dbdd'} />
                        </TouchableOpacity>
                    </View>


                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Forgot")}
                >
                    <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                
                

             
                <AwesomeButtonRick
                onPress={handleSubmit}
                raiseLevel={-4}

            
                type="primary">
                    <Text style={styles.textLogin}>Iniciar sesión</Text>
                </AwesomeButtonRick>
           

                <View style={styles.singup}>
                    <Text style={[styles.textSingup, {
                        color: 'gray'
                    }]}>¿No tienes cuenta?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Registrar")}
                    >
                        <Text style={[styles.textSingup, {
                            color: '#87d396',
                            marginLeft: 3
                        }]}>¡Regístrate!</Text>
                    </TouchableOpacity>


                </View>
                <View style={styles.errorMessage}>

                </View>
                <SCLAlert
                    theme="warning"
                    show={showAlert}
                    title="¡Cuidado!"
                    subtitle="Falta correo electrónico y contraseña"
                    cancellable={true}
                    titleStyle={{ fontFamily: "Poppins_600SemiBold", }}
                    subtitleStyle={{ fontSize: 17, fontFamily: "Poppins_300Light" }}
                    onRequestClose={handleClose}
                    headerIconComponent={<FontAwesome5 name="exclamation" size={35} color="#FFF" />}
                >
                    <SCLAlertButton theme="warning"
                        textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}
                        onPress={handleClose}>
                        Aceptar
                    </SCLAlertButton>

                </SCLAlert>

                <SCLAlert
                    theme="warning"
                    show={showAlertDos}
                    title="¡Cuidado!"
                    titleStyle={{ fontFamily: "Poppins_600SemiBold", }}
                    subtitle="El correo y contraseña no coinciden y/o el usuario ya está registrado"
                    cancellable={true}
                    onRequestClose={handleCloseDos}
                    subtitleStyle={{
                        fontSize: 14, fontFamily: "Poppins_300Light",
                    }}
                    headerIconComponent={<FontAwesome5 name="exclamation" size={35} color="#FFF" />}

                >
                    <SCLAlertButton
                        theme="warning"
                        textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}

                        onPress={handleCloseDos}>
                        Aceptar
                </SCLAlertButton>

                </SCLAlert>
            </View>
        </ScrollView >

    );
}

export default LoginScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 100,
        height: 650

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        color: '#87d396',
        fontSize: 30,
        fontFamily: "Poppins_600SemiBold",

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
        marginTop: 10
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        fontFamily: "Poppins_300Light",

    },

    forgot: {
        textAlign: 'right',
        marginTop: 15,
        marginBottom:15,
        color: '#87d396',
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
    btnEye: {
        position: 'absolute',

        right: 10
    },
    errorMessage: {
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'

    }

})

