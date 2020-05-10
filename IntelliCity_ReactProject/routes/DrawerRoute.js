import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//import List from './../pages/List';
//import Map from './../pages/Map';
import StackList from './StackList';
import StackMap from './StackMap';
import About from './../pagesNav/About';

const Drawer = createDrawerNavigator();

export default function DrawerRoute({navigation}) {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="List" component={StackList} />
        <Drawer.Screen name="Map" component={StackMap} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
  );
}
