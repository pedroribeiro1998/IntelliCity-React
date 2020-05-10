//import * as React from 'react';
import React, { Component, useState, useContext, useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {LocalizationContext} from '../services/localization/LocalizationContext';

//import List from './../pages/List';
//import Map from './../pages/Map';
import StackList from './StackList';
import StackMap from './StackMap';
import About from './../pagesNav/About';

const Drawer = createDrawerNavigator();

export default function DrawerRoute({navigation}) {
  const {translations} = useContext(LocalizationContext);
  return (
      <Drawer.Navigator>
        <Drawer.Screen 
          name="List" 
          component={StackList}
          options={{ title: translations.ReportsListNavBar }} />
        <Drawer.Screen 
          name="Map" 
          component={StackMap}
          options={{ title: translations.MapaNavBar }} />
        <Drawer.Screen 
          name="About" 
          component={About}
          options={{ title: translations.About }} />
      </Drawer.Navigator>
  );
}
