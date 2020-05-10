import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { StackActions } from '@react-navigation/native';

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

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../translations/en.json"),
  pt: () => require("../translations/pt.json")
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

export default class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config

    this.state = {
      screen: Dimensions.get('window'),
      username: '',
      password: '',
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
      <View style={this.getStyle().container} onLayout = {this.onLayout.bind(this)}>
        <View style={this.getStyle().part1} onLayout = {this.onLayout.bind(this)}>
        <Image
            style={this.getStyle().image} onLayout = {this.onLayout.bind(this)}
            source={require('../Images/map.png')}
          />
        </View>
        <View style={this.getStyle().part2} onLayout = {this.onLayout.bind(this)}>
        <TextInput
          style={this.getStyle().textinput} onLayout = {this.onLayout.bind(this)}
          placeholder={translate("UsernameTextInput")}
          onChangeText={(val) => this.setState({username: val})}
        />
        <TextInput
          style={this.getStyle().textinput} onLayout = {this.onLayout.bind(this)}
          placeholder={translate("PasswordTextInput")}
          onChangeText={(val) => this.setState({password: val})}
        />
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
          <Button

            onPress={() => {
              this.props.navigation.navigate('DrawerRoute');
            }}
            /*
            onPress={() => {
              this.props.navigation.navigate('Map_Screen', {
                username: this.state.username, 
                password: this.state.password
              });
            }}
            */
            color="blue"
            title={translate("LoginButton")}
          />
        </View>
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
          <Button
            onPress={() => {
              //alert('Vamos registar!');
              this.props.navigation.navigate('Registar_ScreenClass');
            }}
            color="green"
            title={translate("RegistarButton")}
          />
        </View>
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
          <Button

            onPress={() => {
              this.props.navigation.navigate('DrawerRouteSemLogin');
            }}
            /*
            onPress={() => {
              //alert('Vamos registar!');
              this.props.navigation.navigate('ReportsList_Screen');
            }}
            */
            color="orange"
            title={translate("ReportsListButton")}
          />
        </View>
      </View>
      </View>
    );
  }
}

const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  part1: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    flex: 2,
    backgroundColor: 'white',
  },
  part3: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    margin: 10,
  },
  buttonview: {
    flex: 1,
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 25,
  },
  textinput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
  textinput2: {
    height: 40,
    margin: 10,
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
   
const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  part1: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    flex: 2,
    backgroundColor: 'white',
  },
  part3: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    margin: 10,
  },
  buttonview: {
    flex: 1,
    margin: 10,
    borderColor: 'black',
  },
  text: {
    color: 'black',
    fontSize: 25,
  },
  textinput: {
    height: 40,
    borderColor: 'black',
    //backgroundColor: 'grey',
    borderWidth: 1,
    margin: 10,
  },
  textinput2: {
    height: 40,
    margin: 10,
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
