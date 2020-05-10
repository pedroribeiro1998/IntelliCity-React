import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import StackListSemLogin from './StackListSemLogin';
import Other from './../pagesNav/Other';

const Drawer = createDrawerNavigator();

export default function DrawerRoute({navigation}) {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Other" component={Other} />
        <Drawer.Screen name="List" component={StackListSemLogin} />
      </Drawer.Navigator>
  );
}
