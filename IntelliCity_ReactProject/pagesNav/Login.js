import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { StackActions } from '@react-navigation/native';
import Realm from 'realm';
let realm;

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
  ToastAndroid,
  TouchableOpacity,
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
      loading: false,
    };

    realm = new Realm({
      path: 'utilizador.realm', //nome da bd
      schema: [{
        name: 'utilizador',
        properties: {
          id: {type: 'int',   default: 0},
          id_user: {type: 'int', default: 0},
          nome: 'string',
          username: 'string',
          password: 'string',
          data_nasc: 'string',
          morada: 'string',
        }
      }]
    });
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

  ExecuteLogin = () => {
    let arr = {username: this.state.username, password: this.state.password};
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/loginUser', {
      method: "POST",//Request Type 
      body: JSON.stringify(arr), //post body
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      if (responseJson.data.username && responseJson.data.password) {
        alert(translate("AlertLoginSucesso"));
        realm.write(() => {
          let ID = realm.objects('utilizador').length + 1;
          realm.create('utilizador', {
            id: ID,
            id_user: parseInt(responseJson.data.id),
            nome: responseJson.data.nome,
            username: responseJson.data.username,
            password: responseJson.data.password,
            data_nasc: responseJson.data.data_nasc,
            morada: responseJson.data.morada,
          });
        });
        this.props.navigation.navigate('DrawerRoute', {
          id_utilizador: responseJson.data.id,
          //username: responseJson.data.username,
          //nome: responseJson.data.nome,
        });
      } else if (responseJson.status === 'false') {
        alert('errado!');
      }else{
        alert('Credenciais Erradas, tente novamente!');
      }
      //alert(JSON.stringify(responseJson));
      console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  };

  LetsRegistar = () => {
    this.props.navigation.navigate('Registar_ScreenClass');
  }

  LetsListaReports = () => {
    this.props.navigation.navigate('DrawerRouteSemLogin');
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
          style={this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
          placeholder={translate("UsernameTextInput")}
          underlineColorAndroid = "transparent"
          onChangeText={(val) => this.setState({username: val})}
        />
        <TextInput
          style={this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
          placeholder={translate("PasswordTextInput")}
          underlineColorAndroid = "transparent"
          onChangeText={(val) => this.setState({password: val})}
        />
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
        <TouchableOpacity 
            onPress={
              this.ExecuteLogin
            } 
            activeOpacity={0.7} 
            style={this.getStyle().TouchableOpacity} onLayout = {this.onLayout.bind(this)} >
            <Text 
              style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("LoginButton")}</Text>
          </TouchableOpacity>
        </View>
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
          <TouchableOpacity 
            onPress={
              this.LetsRegistar
            } 
            activeOpacity={0.7} 
            style={this.getStyle().TouchableOpacity} onLayout = {this.onLayout.bind(this)} >
            <Text 
              style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("RegistarButton")}</Text>
          </TouchableOpacity>
        </View>
        <View style={this.getStyle().buttonview} onLayout = {this.onLayout.bind(this)}>
          <TouchableOpacity 
            onPress={
              this.LetsListaReports
            } 
            activeOpacity={0.7} 
            style={this.getStyle().TouchableOpacity} onLayout = {this.onLayout.bind(this)} >
            <Text 
              style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("ReportsListButton")}</Text>
          </TouchableOpacity>
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
  TextInputStyleGreen:{
    borderWidth: 1,
    margin: 10,
    borderColor: '#009688',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  TouchableOpacity: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    margin: 12
  },
  TouchableOpacityText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
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
  TextInputStyleGreen:{
    borderWidth: 1,
    margin: 10,
    borderColor: '#009688',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  TouchableOpacity: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    margin: 12
  },
  TouchableOpacityText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
