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
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
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
            onPress={() => this.props.navigation.navigate('Notes_Screen')}
            onPress={() => {
              alert('Login com username: ' + username + ' e password: ' + password);
              navigation.navigate('Map_Screen', {
                username : username,
                password : password,
              });
            }}
            color="blue"
            title={translate("LoginButton")}
          />
        </View>
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
          <Button
            onPress={() => {
              //alert('Vamos registar!');
              navigation.navigate('Registar_Screen');
            }}
            color="green"
            title={translate("RegistarButton")}
          />
        </View>
      </View>
        <View style={this.getStyle().part3} onLayout = {this.onLayout.bind(this)}>
         <Button
            onPress={() => {
              //alert('Vamos registar!');
              navigation.navigate('ReportsList_Screen');
            }}
            color="orange"
            title={translate("ReportsListButton")}
          />
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    flex: 2,
    backgroundColor: 'blue',
  },
  part3: {
    flex: 1,
    backgroundColor: 'red',
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
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  textinput2: {
    height: 40,
    margin: 10,
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
  },
});
   
const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  part1: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    flex: 2,
    backgroundColor: 'blue',
  },
  part3: {
    flex: 1,
    backgroundColor: 'blue',
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
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  textinput2: {
    height: 40,
    margin: 10,
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
  },
});
