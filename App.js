import React from "react";
import { View, StatusBar, YellowBox } from "react-native";
import Routes from "./Router";
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs(true)
YellowBox.ignoreWarnings(["Setting a timer"])
// import { Container } from './styles';
import TodoStore from './data/TodoStore';

export default function App() {
  return (
    <>
    <TodoStore>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <Routes />
      </TodoStore>
     
    </>
  );
}