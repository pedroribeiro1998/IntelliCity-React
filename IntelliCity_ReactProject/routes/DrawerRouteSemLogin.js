//import * as React from 'react';
import React, { Component, useState, useContext, useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {LocalizationContext} from '../services/localization/LocalizationContext';

import StackListSemLogin from './StackListSemLogin';
import Other from './../pagesNav/Other';

const Drawer = createDrawerNavigator();

export default function DrawerRoute({navigation}) {
  const {translations} = useContext(LocalizationContext);

  return (
      <Drawer.Navigator>
        <Drawer.Screen 
          name="Other" 
          component={Other}
          options={{ title: translations.Other }} />
        <Drawer.Screen 
          name="List" 
          component={StackListSemLogin}
          options={{ title: translations.ReportsListNavBar }} />
      </Drawer.Navigator>
  );
}
