import React, { useRef, useState } from "react";
import {
    StatusBar,
    Image,
    LayoutAnimation,
    TouchableOpacity,
    View, Text, StyleSheet, Alert, ScrollView

} from "react-native";
import { Container, Header, Title, Feed, Logo, LogoDos, BackButton } from "./styles";
import { TextInput } from 'react-native-gesture-handler';
import { Kohana } from 'react-native-textinput-effects';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
//fuentes
import Constants  from 'expo-constants';
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

function ForgotPassScreen({ navigation }) {
    const passwordRef = useRef();

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
        navigation.goBack();
    }
    const handleOpenDos = () => {
        setShowAlertDos(true)
    }

  
   async function recuperarContraseña() {

        try{
            await firebase
            .auth()
            .sendPasswordResetEmail(email)

            handleOpenDos();
        }
        catch(error){
            handleOpen();
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

            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />

            <View style={{ flexDirection: "row" }}>
                    <Logo
                        source={require('../../assets/Gifs/animation_500_ki28f8pt.gif')}
                    >
                    </Logo>
                 
                </View>



            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.text}>Le enviaremos un correo electrónico con más intrucciones sobre cómo restablecer
        su contraseña</Text>


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
                    blur
                    keyboardType="email-address"
                    returnKeyType="send"
                  
                    value={email}

                    onChangeText={setEmail}
                />

            </View>


            <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                    <Text style={styles.forgot}>Volver al inicio de sesión</Text>
                </TouchableOpacity>


            <TouchableOpacity style={styles.login}
                onPress={recuperarContraseña}>

                <Text style={styles.textLogin}>Enviar correo electrónico</Text>

            </TouchableOpacity>


            <View style={styles.errorMessage}>

            </View>
       

            <SCLAlert
                theme="danger"
                show={showAlert}
                title="¡Cuidado!"
                titleStyle={{ fontFamily: "Poppins_600SemiBold", }}
                subtitle="El correo no existe, verifique por favor."
                cancellable={true}
                onRequestClose={handleClose}
                subtitleStyle={{
                    fontSize: 14, fontFamily: "Poppins_300Light",
                }}
                headerIconComponent={<FontAwesome5 name="exclamation" size={35} color="#FFF" />}

            >
                <SCLAlertButton
                    theme="danger"
                    textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}

                    onPress={handleClose}>
                    Aceptar
                </SCLAlertButton>

            </SCLAlert>

            <SCLAlert
                theme="info"
                show={showAlertDos}
                title="¡Revisa tu correo!"
                titleStyle={{ fontFamily: "Poppins_600SemiBold", }}
                subtitle="Te enviamos instrucciones a tu correo"
                cancellable={true}
                onRequestClose={handleCloseDos}
                subtitleStyle={{
                    fontSize: 14, fontFamily: "Poppins_300Light",
                }}
                headerIconComponent={<FontAwesome5 name="paper-plane" size={35} color="#FFF" />}

            >
                <SCLAlertButton
                    theme="info"
                    textStyle={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}

                    onPress={handleCloseDos}>
                    Aceptar
                </SCLAlertButton>

            </SCLAlert>
        </View>

    );
}

export default ForgotPassScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,

        paddingVertical: 20,



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
        borderColor: '#d7dbdd',
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

