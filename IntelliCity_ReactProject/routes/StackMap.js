/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//import * as React from 'react';
import React, { Component, useState, useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import {LocalizationContext} from '../services/localization/LocalizationContext';

import Map from './../pagesNav/Map';
import AddNewToMap from './../pagesNav/AddNewToMap';

const Stack = createStackNavigator();

function StackMap({navigation}) {
   const {translations} = useContext(LocalizationContext);
   return (
       <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Map" 
            component={Map}
            options={{ title: translations.MapaNavBar }} />
          <Stack.Screen 
            name="AddNewToMap" 
            component={AddNewToMap}
            options={{ title: translations.AddNewToMap }} />
       </Stack.Navigator>
   );
 }

 export default StackMap;
