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

import Map from './../pagesNav/Map';
import AddNewToMap from './../pagesNav/AddNewToMap';

const Stack = createStackNavigator();

function StackMap({navigation}) {
   return (
       <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="AddNewToMap" component={AddNewToMap}/>
       </Stack.Navigator>
   );
 }

 export default StackMap;
