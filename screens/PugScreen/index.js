import React, { useRef, useState } from "react";
import {
    StatusBar,
    Image,
    LayoutAnimation,
    TouchableOpacity,
    View, Text, StyleSheet, Alert, ScrollView

} from "react-native";

import Constants from 'expo-constants';
import {
    useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
    Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
    Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
    Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"


import { AppLoading } from "expo"
import Swiper from 'react-native-swiper'

import * as firebase from "firebase";
import { Txt, Logo } from "./styles";

function PugScreen({ navigation }) {

    LayoutAnimation.easeInEaseOut();

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


        <Swiper style={styles.wrapper}>
            <View style={styles.slide1}>

                <Logo
                    source={require('../../assets/Gifs/24698-pug-dog-smiling.gif')}
                >
                </Logo>
                <Txt style={{ fontFamily: 'Poppins_600SemiBold' }}>Soy Loki </Txt>

            </View>
            <View style={styles.slide2}>
                <Logo
                    source={require('../../assets/Gifs/24935-grey-poodle-waving.gif')}
                >
                </Logo>
                <Txt style={{ fontFamily: 'Poppins_600SemiBold' }}>Soy Koka </Txt>
            </View>

        </Swiper>
    );
}

export default PugScreen;

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})


