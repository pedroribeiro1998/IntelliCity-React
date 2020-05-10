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

import ListSemLogin from './../pagesNav/ListSemLogin';
import ListDetailsSemLogin from './../pagesNav/ListDetailsSemLogin';

const Stack = createStackNavigator();

function StackList({navigation}) {
   return (
       <Stack.Navigator initialRouteName="List">
         <Stack.Screen name="List" component={ListSemLogin}/>
         <Stack.Screen name="ListDetails" component={ListDetailsSemLogin}/>
       </Stack.Navigator>
   );
 }

 export default StackList;
