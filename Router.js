import React from "react";
import FirebaseKeys from "./config/Firebasekeys";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AddButton from './components/AddButton';
import { Ionicons, FontAwesome5 } from "@expo/vector-icons/";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import PrincipalScreen from "./screens/PrincipalScreen";

import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import MessagesScreen from "./screens/MessagesScreen";
import NotificationScreen from "./screens/NotificationScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TablerosScreen from "./screens/TableroScreen";
import NuevoTablerosScreen from "./screens/NuevoTableroScreen";
import ReporteScreen from "./screens/ReporteScreen";
import MenuScreen from "./screens/MenuScreen";
import PugScreen from "./screens/PugScreen";

import EditProfileScreen from "./screens/EditProfileScreen";
import ComentariosScreen from "./screens/ComentariosScreen";

import OtroPerfil from "./screens/OtroPerfil";

//infoScreens

import TerminoScreen from "./informacion/TerminoScreen";

import Spam from "./informacion/Spam";
import Erroneo from "./informacion/Erroneo";
import Propiedad from "./informacion/Propiedad";
import Indebido from "./informacion/Indebido";
import MalUso from "./informacion/MalUso";
import Acoso from "./informacion/Acoso";
import NoPor from "./informacion/NoPor";
import Autolesiones from "./informacion/Autolesiones";


import NewRutina from "./screens/NewRutina";

import * as firebase from "firebase";
import InfoScreen from "./screens/InfoScreen";
import { Transition } from "react-native-reanimated";


const AppContainer = createStackNavigator(

  
  {
    
    default: createBottomTabNavigator(
      {
        Inicio: {
          screen: HomeScreen,
          navigationOptions: {
            
            
            tabBarIcon: ({ tintColor,  }) => (
              <FontAwesome5 name="home"
               size={22}
               color={tintColor} />
            ),
            


          }
          
        },
        Descubrir: {
          screen: MessagesScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="search" size={22} color={tintColor} />
            )
          }
        },
        Postagens: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: () => (<AddButton />),
            tabBarLabel: ' '
          },

        },
        Calendario: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="calendar-alt" size={22} color={tintColor} />
            ),
            
          }
        },
        Yo: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="user-alt" size={22} color={tintColor} />
            )
            
          },

  
        },
        
      },
   
      {
        defaultNavigationOptions: {
          
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Postagens") {
              navigation.navigate("postModal");
            } else {
              defaultHandler();
            }
          }
          
        },
        tabBarOptions: {
          activeTintColor: "#87d396",
          inactiveTintColor: "#B8BBC4",
          showLabel: true,
          
          style: {
           
            borderTopWidth:1,

            borderLeftWidth:1,
            borderRightWidth:1,
            borderTopColor:'#87d396',
            borderColor:'#87d396',
           
            borderTopRightRadius:15,
            borderTopLeftRadius:15,

        

          }


        }
      },
),
    postModal: {
      screen: PostScreen,
  

    },
    taba:{
      screen: InfoScreen
    },
    tableros:{
      screen: TablerosScreen
    },
    nuevoTablero:{
      screen: NuevoTablerosScreen
    },
    reporte:{
      screen: ReporteScreen
    },
    editScreen:{
      screen: EditProfileScreen,
      
    },
    nuevoRutina:{
      screen: NewRutina,
      
    },
    menuScreen:{
      screen: MenuScreen,
      
    },
    pugScreen:{
      screen: PugScreen,
      
    }
    ,
    termScreen:{
      screen: TerminoScreen,
      
    },
    Spam:{
      screen: Spam,
    

    },
    Erroneo:{
      screen: Erroneo,
      
    },
    Propiedad:{
      screen: Propiedad,
      
    },
    Indebido:{
      screen: Indebido,
      
    },
    MalUso:{
      screen: MalUso,
      
    },
    Acoso:{
      screen: Acoso,
      
    },
    NoPor:{
      screen: NoPor,
      
    },
    Autolesiones:{
      screen: Autolesiones,
      
    },
    Comentarios:{
      screen: ComentariosScreen,
      
    }
  },
  {
    defaultNavigationOptions:{

      ...TransitionPresets.SlideFromRightIOS,
      headerShown:false,
    
    },
  },
  
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Registrar: RegisterScreen,
    Forgot: ForgotPassScreen,
    Terms: TerminoScreen,
    Principal: PrincipalScreen
  },
  {
    initialRouteName: "Principal",
    
    defaultNavigationOptions: {
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS
      
      
      
    },
  
    
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
  
    {
      initialRouteName: "Loading",
      
    }
  )
);