/*Home Screen With buttons to navigate to diffrent options*/
/*import React from 'react';
import { View, Text, Button } from 'react-native';

 function AddNewToMap({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Text>map add new...</Text>

     </View>
   );
 }
export default AddNewToMap;*/

import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { StackActions } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';


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
  Platform,
  TouchableOpacity, 
  Alert, 
  YellowBox,
  ListView,
  TouchableWithoutFeedback
} from 'react-native';

import Realm from 'realm';
let realm ;

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

export default class AddNewToMap extends React.Component{
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config

    this.state = {
      screen: Dimensions.get('window'),
      titulo : '',
      descricao : '',
      localizacao : '',
      latitude : '',
      longitude : '',
      markerPosition: {
        latitude: 0,
        longitude: 0,
      }
    };

    realm = new Realm({
      path: 'reports.realm', //nome da bd
      schema: [{
        name: 'report',
        properties: {
          id: {type: 'int',   default: 0},
          titulo: 'string',
          descricao: 'string',
          localizacao: 'string',
        }
      }]
    });
  }
  
  // Multi-língua
  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);

    Geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var inicialRegion = {
          latitude: lat,
          longitude: long,
        }

        this.setState({markerPosition: inicialRegion})
      },
      error => Alert.error('Error', JSONstringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }
  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };
  // Multi-língua
  
  // Portrait e Landscape
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
  // Portrait e Landscape

  addRegisto=()=>{
    realm.write(() => {
      var ID = realm.objects('report').length + 1;
       realm.create('report', {
         id: ID,
         titulo: this.state.titulo,
         descricao: this.state.descricao,
         localizacao: this.state.localizacao,
        });
    });
    Alert.alert("Report inserido com sucesso!");
  }

  render(){
    return(
      <View style={this.getStyle().container} onLayout = {this.onLayout.bind(this)}>
        <View style={this.getStyle().part1} onLayout = {this.onLayout.bind(this)}>
        <Image
          style = {this.getStyle().image} onLayout = {this.onLayout.bind(this)}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        </View>
        <View style={this.getStyle().part2} onLayout = {this.onLayout.bind(this)}>
          <TextInput
              placeholder={translate("TituloTextInput")}
              style={this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
              underlineColorAndroid = "transparent"
              onChangeText = { ( text ) => { this.setState({ titulo: text })} }
          />
          <TextInput
            placeholder={translate("DescricaoTextInput")}
            style={this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
            underlineColorAndroid = "transparent"
            onChangeText = { ( text ) => { this.setState({ descricao: text })} }
          />
          <TextInput
            placeholder={translate("LocalizationTextInput")}
            style={this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
            underlineColorAndroid = "transparent"
            onChangeText = { ( text ) => { this.setState({ localizacao: text })} }
          />          
        </View>
        <View style={this.getStyle().part3} onLayout = {this.onLayout.bind(this)}>
          <Text 
            style = {this.getStyle().text} onLayout = {this.onLayout.bind(this)} 
          >
            {translate("Latitude") + ": " + this.state.markerPosition.latitude}
          </Text>
          <Text 
            style = {this.getStyle().text} onLayout = {this.onLayout.bind(this)} 
          >
            {translate("Longitude") + ": " + this.state.markerPosition.longitude}
          </Text>
          <TouchableOpacity 
            onPress={
              this.addRegisto
            } 
            activeOpacity={0.7} 
            style={this.getStyle().TouchableOpacity} onLayout = {this.onLayout.bind(this)} >
            <Text 
              style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("AddButton")}</Text>
          </TouchableOpacity>
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
    //alignItems: 'center',
  },
  part2: {
    flex: 1,
    backgroundColor: 'white',
  },
  part3: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonview: {
    flex: 1,
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
    marginLeft: 10,
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
    width: 150,
    height: 150,
    resizeMode: "contain",
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  TouchableOpacity: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    margin: 12
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
    justifyContent: 'center',
    //alignItems: 'center',
  },
  part3: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  buttonview: {
    flex: 1,
    margin: 10,
    borderColor: 'black',
  },
  text: {
    color: 'black',
    fontSize: 15,
    marginLeft: 10,
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
    width: 150,
    height: 150,
    resizeMode: "contain",
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  TouchableOpacity: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    margin: 12
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
  TouchableOpacityText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
