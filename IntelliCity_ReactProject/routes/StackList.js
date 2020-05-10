/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { View, Text, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import List from './../pagesNav/List';
import ListDetails from './../pagesNav/ListDetails';

const Stack = createStackNavigator();

function StackList({navigation}) {
   return (
       <Stack.Navigator initialRouteName="List">
         <Stack.Screen name="List" component={List}/>
         <Stack.Screen name="ListDetails" component={ListDetails}/>
       </Stack.Navigator>
   );
 }

 export default StackList;
