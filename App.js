// npm install axios @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AddPassword from './AddPassword'; 
import ShowAllPasswords from './ShowAllPasswords';
import EditPassword from './EditPassword';
import SearchResult from './SearchResult';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import process from 'process';
global.process = process;

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='AddPassword' component={AddPassword}/>
        <Stack.Screen name='ShowAllPasswords' component={ShowAllPasswords}/>
        <Stack.Screen name='EditPassword' component={EditPassword}/>
        <Stack.Screen name='SearchResult' component={SearchResult}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  


