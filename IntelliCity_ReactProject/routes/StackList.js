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

import List from './../pagesNav/List';
import ListDetails from './../pagesNav/ListDetails';

const Stack = createStackNavigator();

function StackList({navigation}) {
  const {translations} = useContext(LocalizationContext);
   return (
       <Stack.Navigator initialRouteName="List">
         <Stack.Screen 
          name="List" 
          component={List}
          options={{ title: translations.ReportsListNavBar }} />
         <Stack.Screen 
          name="ListDetails" 
          component={ListDetails}
          options={{ title: translations.ListaDetalhes }} />
       </Stack.Navigator>
   );
 }

 export default StackList;
