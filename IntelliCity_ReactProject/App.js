import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

import {
  I18nManager,
  SafeAreaView,
  ScrollView,
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
import {LocalizationContext} from './services/localization/LocalizationContext';


import Login_Screen from './pages/Login_Screen2';
import Registar_Screen from './pages/Registar_Screen2';
import ReportsList_Screen from './pages/ReportsList_Screen';
import Map_Screen from './pages/Map_Screen';

const Stack = createStackNavigator();

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("./translations/en.json"),
  pt: () => require("./translations/pt.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export default class App extends React.Component{
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      screen: Dimensions.get('window'),
    };
  }
  
  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };
  
  getOrientation(){
    if (this.state.screen.width > this.state.screen.height) {
      return 'LANDSCAPE';
    }else {
      return 'PORTRAIT';
    }
  }

  getStyle(){
    if (this.getOrientation() === 'LANDSCAPE') {
      return landscapeStyles;
    } else {
      return portraitStyles;
    }
  }

  onLayout(){
    this.setState({screen: Dimensions.get('window')});
  }

  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login_Screen">
        <Stack.Screen 
          name="Login_Screen" 
          component={Login_Screen}
          options={{ title: translate('LoginNavBar') }}
        />
        <Stack.Screen 
          name="Registar_Screen" 
          component={Registar_Screen}
          options={{ title: translate('RegistarNavBar') }}
        />
        <Stack.Screen 
          name="ReportsList_Screen" 
          component={ReportsList_Screen}
          options={{ title: translate('ReportsListNavBar') }}
        />
        <Stack.Screen 
          name="Map_Screen" 
          component={Map_Screen}
          options={{ title: translate('MapaNavBar') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
