import React, { Component, useState } from 'react';
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

/*
import Login_Screen from './../pagesClass/Login_ScreenClass';
import Registar_Screen from './../pagesClass/Registar_ScreenClass';
import ReportsList_Screen from './../pagesClass/ReportsList_ScreenClass';
import Map_Screen from './../pagesClass/Map_ScreenClass';
*/

import Login from './../pagesNav/Login';
import Other from './../pagesNav/Other';
import DrawerRoute from './DrawerRoute';


const Stack = createStackNavigator();

function StackLogin({navigation}) {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
         <Stack.Screen name="Login" component={Login}
            options={{headerShown : false,}}/>
        <Stack.Screen name="Other" component={Other}
           options={{headerShown : false,}}/>
         <Stack.Screen name="DrawerRoute" component={DrawerRoute}
            options={{headerShown : false,}}/>
       </Stack.Navigator>
      </NavigationContainer>
   );
 }

 export default StackLogin;
