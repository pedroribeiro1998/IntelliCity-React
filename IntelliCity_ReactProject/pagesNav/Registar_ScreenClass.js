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

    this.state = {
      screen: Dimensions.get('window'),
      nome:'',
      username: '',
      password: '',
      morada: 'Viana do Castelo',
      data_nasc : '1993-12-24',
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

  ExecuteRegistar = () => {
    let arr = {
      nome: this.state.nome,
      username: this.state.username, 
      password: this.state.password,
      data_nasc: this.state.data_nasc,
      morada: this.state.morada
    };
    alert(arr);
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/registoUser', {
      method: "POST",//Request Type 
      body: JSON.stringify(arr), //post body
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      alert(' registado com sucesso!');
      this.props.navigation.navigate('Login');
      //alert(JSON.stringify(responseJson));
      console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  };

  render(){
    return(
      <View style={this.getStyle().container} onLayout = {this.onLayout.bind(this)}>
        <View style={this.getStyle().part1} onLayout = {this.onLayout.bind(this)}>
          <Text style={this.getStyle().text} onLayout = {this.onLayout.bind(this)}>
            {translate("InserirDadosText")}
          </Text>
        </View>
        <View style={this.getStyle().part2} onLayout = {this.onLayout.bind(this)}>
          <TextInput
            style={this.getStyle().textinput} onLayout = {this.onLayout.bind(this)}
            placeholder={translate("NomeTextInput")}
            onChangeText = { ( text ) => { this.setState({ nome: text })} }
          />
          <TextInput
            style={this.getStyle().textinput} onLayout = {this.onLayout.bind(this)}
            placeholder={translate("UsernameTextInput")}
            onChangeText = { ( text ) => { this.setState({ username: text })} }
          />
          <TextInput
            style={this.getStyle().textinput} onLayout = {this.onLayout.bind(this)}
            placeholder={translate("PasswordTextInput")}
            onChangeText = { ( text ) => { this.setState({ password: text })} }
          />
          <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
            <Button
              onPress={this.ExecuteRegistar}
              color="green"
              title={translate("RegistarButton")}
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
