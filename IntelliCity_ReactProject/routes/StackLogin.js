import React, { Component, useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LocalizationContext} from '../services/localization/LocalizationContext';

/*
import Login_Screen from './../pagesClass/Login_ScreenClass';
import Registar_Screen from './../pagesClass/Registar_ScreenClass';
import ReportsList_Screen from './../pagesClass/ReportsList_ScreenClass';
import Map_Screen from './../pagesClass/Map_ScreenClass';
*/

import Login from '../pagesNav/Login';
import Registar_ScreenClass from './../pagesNav/Registar_ScreenClass';
import DrawerRoute from './DrawerRoute';
import DrawerRouteSemLogin from './DrawerRouteSemLogin';


const Stack = createStackNavigator();

function StackLogin({navigation}) {
  const {translations} = useContext(LocalizationContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}
          options={{headerShown : false,}}/>
        <Stack.Screen 
          name="Registar_ScreenClass" 
          component={Registar_ScreenClass}
          options={{ title: translations.RegistarButton }}
          />
        <Stack.Screen name="DrawerRouteSemLogin" component={DrawerRouteSemLogin}
          options={{headerShown : false,}}/>
        <Stack.Screen name="DrawerRoute" component={DrawerRoute}
          options={{headerShown : false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
   );
 }

 export default StackLogin;
