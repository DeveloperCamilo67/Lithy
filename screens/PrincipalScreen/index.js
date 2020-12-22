import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Image, Alert } from 'react-native';
import Constants from 'expo-constants';

import image1 from '../../assets/Gifs/36895-healthy-or-junk-food.gif';
import image2 from '../../assets/Gifs/22979-meditating-lady.gif';
import image3 from '../../assets/Gifs/36914-women-online-exercises.gif';
import image4 from '../../assets/Gifs/34658-profile-in-mobile.gif';
import image5 from '../../assets/Gifs/24220-hello-i-am-serenity.gif';
import image6 from '../../assets/Gifs/38458-photo-uploading.gif';
import image7 from '../../assets/Gifs/ejezc.gif';
import image8 from '../../assets/Gifs/10298-calendar.gif';
import image9 from '../../assets/Gifs/17103-leaf.gif';

import Swiper from 'react-native-swiper'
import {
    useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/red';


function PrincipalScreen({ navigation, isFocused }) {



    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
    ];

    useEffect(() => {
        changeImage();

    });

    const [currentImageIndex, setCurrentImageIndex] = useState();



    const changeImage = () => {

        const randomNumber = Math.floor(Math.random() * images.length);

        setCurrentImageIndex(randomNumber)


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

            <View style={styles.contentContainer}>
                <View style={styles.top}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logopequenio.png')}
                    />

                    <Swiper
                        autoplay={true}
                        autoplayTimeout={3}
                        loop={true}
                        dot={
                            <View
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    width: 5,
                                    height: 5,
                                    borderRadius: 4,
                                    borderTopRightRadius: 1,
                                    borderBottomLeftRadius: 1,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3
                                }}
                            />
                        }
                        activeDot={
                            <View
                                style={{
                                    backgroundColor: '#87d396',
                                    width: 10,
                                    height: 10,
                                    borderRadius: 4,
                                    borderTopRightRadius: 1,
                                    borderBottomLeftRadius: 1,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3
                                }}

                            />
                        }
                        paginationStyle={{
                            bottom: 5,

                            right: 10
                        }}
                    >
                        <View style={styles.slide1}>

                            <Image
                                style={styles.welcomeImage}
                                source={image4}
                            >
                            </Image>
                            <Text style={styles.heading}>¡Crea tu perfil de usuario!</Text>
                            <Text style={styles.subHeading}>
                                ¡Administra tu perfil de usuario en Lithy, da a conocer quien eres!{' '}
                            </Text>

                        </View>

                        <View style={styles.slide1}>

                            <Image
                                style={styles.welcomeImage}
                                source={image6}
                            >
                            </Image>
                            <Text style={styles.heading}>¡Tu vida saludable compártela!</Text>
                            <Text style={styles.subHeading}>
                                ¡Comparte videos, fotos de recetas, actividades físicas lo que sea saludable!{' '}
                            </Text>

                        </View>
                        <View style={styles.slide1}>

                            <Image
                                style={styles.welcomeImage}
                                source={image8}
                            >
                            </Image>
                            <Text style={styles.heading}>¡Crea actividades en tu horario!</Text>
                            <Text style={styles.subHeading}>
                                ¡Crea nuevas actividades para tus rutinas día a día!{' '}
                            </Text>

                        </View>
                        <View style={styles.slide1}>

                            <Image
                                style={styles.welcomeImage}
                                source={image3}
                            >
                            </Image>
                            <Text style={styles.heading}>¡Mira lo que publican otras personas!</Text>
                            <Text style={styles.subHeading}>
                                ¡Puedes observar las publicaciones de todas las personas que utilizan Lithy!{' '}
                            </Text>

                        </View>

                    </Swiper>

                </View>
                <View style={styles.bottom}>

                    <View style={styles.btnWrapper}>

                        <AwesomeButtonRick
                            onPress={() => navigation.navigate("Registrar")}
                            raiseLevel={-4}
                           
                            type="primary">
                            <Text style={styles.textLogin}>Regístrate</Text>
                        </AwesomeButtonRick>


                    </View>
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
                            }]}>¡inicia sesión!</Text>
                        </TouchableOpacity>


                    </View>


                </View>
            </View>
        </View>

    );
}
export default PrincipalScreen;
export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff'
    },
    bg: {
        position: 'absolute',
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
    login: {
        width: '100%',
        height: 40,

        backgroundColor: '#87d396',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 50
    },
    textLogin: {
        color: 'white',
        fontSize: 15,
        fontFamily: "Poppins_600SemiBold",

    },
    contentContainer: {
        padding: 20,
        marginTop: 50,
        flex: 1,


    },
    logo: {
        alignSelf: 'center',
        bottom: 50

    },
    welcomeImage: {
        height: 250,
        width: 250,
        marginLeft: 30,

    },
    top: {
        flex: 4,
    },
    bottom: {
        flex: 1,

    },
    heading: {
        fontFamily: "Poppins_500Medium",
        fontSize: 30,

        lineHeight: 40,
        textAlign: 'center',
        color: "#3F414E"
    },
    subHeading: {
        fontFamily: "Poppins_400Regular",
        fontSize: 15,

        lineHeight: 26,
        textAlign: 'center',
        color: "#A1A4B2"
    },
    btnWrapper: {
        marginTop: 20,
    },
    loginLinkWrapper: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 90,
    },
    notificationContent: {
        color: "#A1A4B2",
        fontSize: 14,
        fontFamily: 'HelveticaNeue',
    },
    link: {
        color: "#8E97FD",
        fontSize: 14,
        fontFamily: 'HelveticaNeue',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 120,
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
});