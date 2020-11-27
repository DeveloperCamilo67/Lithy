import React from "react";
import FirebaseKeys from "./config/Firebasekeys";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AddButton from './components/AddButton';
import { Ionicons, FontAwesome5 } from "@expo/vector-icons/";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import MessagesScreen from "./screens/MessagesScreen";
import NotificationScreen from "./screens/NotificationScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TablerosScreen from "./screens/TableroScreen";
import NuevoTablerosScreen from "./screens/NuevoTableroScreen";
import ReporteScreen from "./screens/ReporteScreen";

import EditProfileScreen from "./screens/EditProfileScreen";

import NewRutina from "./screens/NewRutina";

import * as firebase from "firebase";
import InfoScreen from "./screens/InfoScreen";


const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Inicio: {
          screen: HomeScreen,
          navigationOptions: {
            
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="home" size={24} color={tintColor} />
            ),


          }
          
        },
        Descubrir: {
          screen: MessagesScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="search" size={24} color={tintColor} />
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
              <FontAwesome5 name="calendar-alt" size={24} color={tintColor} />
            )
          }
        },
        Yo: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="user-alt" size={24} color={tintColor} />
            )
          }
        }
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
          activeTintColor: "#2ed34f",
          inactiveTintColor: "#B8BBC4",
          showLabel: true,
          
          style: {
           
            borderTopWidth:1,
            borderRightWidth:1,
            borderLeftWidth:1,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            borderTopColor:'#B8BBC4',
            borderRightColor:'#B8BBC4',
            borderLeftColor:'#B8BBC4'      
          }


        }
      }
    ),
    postModal: {
      screen: PostScreen

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
      screen: EditProfileScreen
    },
    nuevoRutina:{
      screen: NewRutina
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Registrar: RegisterScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerShown: false
      
    }
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
      initialRouteName: "Loading"
    }
  )
);