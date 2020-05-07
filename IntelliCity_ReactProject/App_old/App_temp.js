import React,  {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LocalizationContext} from '../services/localization/LocalizationContext';


import Login_Screen from '../pages/Login_Screen2';
import Registar_Screen from '../pages/Registar_Screen';
import ReportsList_Screen from '../pages/ReportsList_Screen';
import Map_Screen from '../pages/Map_Screen';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const Stack = createStackNavigator();

function App() {
  const {translations} = useContext(LocalizationContext);
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login_Screen">
        <Stack.Screen 
          name="Login_Screen" 
          component={Login_Screen}
          options={{ title: translations.LoginNavBar }}
        />
        <Stack.Screen 
          name="Registar_Screen" 
          component={Registar_Screen}
          options={{ title: translations.RegistarNavBar }}
        />
        <Stack.Screen 
          name="ReportsList_Screen" 
          component={ReportsList_Screen}
          options={{ title: translations.ReportsListNavBar }}
        />
        <Stack.Screen 
          name="Map_Screen" 
          component={Map_Screen}
          options={{ title: translations.MapaNavBar }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
