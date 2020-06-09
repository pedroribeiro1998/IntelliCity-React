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

export default class ListDetails extends React.Component{
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config

    this.state = {
      screen: Dimensions.get('window'),
      id: this.props.route.params.id,
      titulo : this.props.route.params.titulo,
      descricao : this.props.route.params.descricao,
      localizacao : this.props.route.params.localizacao,
      fotografia : this.props.route.params.fotografia,
    };
    realm = new Realm({ path: 'reports.realm' });

  }
  
  // Multi-língua
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

  // update e delete
  updateRegisto=()=>{
    let arr = {
      titulo: this.state.titulo,
      descricao: this.state.descricao, 
      localizacao: this.state.localizacao
    };
    alert(arr);
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports/updateReport/' + this.state.id, {
      method: "POST",//Request Type 
      body: JSON.stringify(arr), //post body
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      alert('Atualizado com sucesso!');
      //alert(JSON.stringify(responseJson));
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
    this.props.navigation.goBack();
  }

  deleteRegisto=()=>{
    Alert.alert(
      'Info',
      'Tem a certeza que pretende remover este report?',
    [
      {text: 'Não', onPress: () => console.log('Pedido cancelado'), style: 'cancel'},
      {text: 'Sim', onPress: () => {this.deleteReport();}},
    ]
    );
  }

  deleteReport = () => {
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports/deleteReport/' + this.state.id, {
      method: "POST",//Request Type 
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      alert('Eliminado com sucesso!');
      //alert(JSON.stringify(responseJson));
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
    this.props.navigation.goBack();
  }
  // update e delete

  render() {    
    return (
      <View style={this.getStyle().container} onLayout = {this.onLayout.bind(this)}>
        <View style={this.getStyle().part1} onLayout = {this.onLayout.bind(this)}>
        <Image
          source={{
            uri: 'https://intellicity.000webhostapp.com/myslim_commov1920/report_photos/' + this.state.fotografia,
          }}
          style = {this.getStyle().image} onLayout = {this.onLayout.bind(this)} >
        </Image>
        </View>
        <View style={this.getStyle().part2} onLayout = {this.onLayout.bind(this)}>
        <TextInput
          placeholder={translate("TituloTextInput")}
          style = {this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
          underlineColorAndroid = "transparent"
          value={this.state.titulo}
          onChangeText = { ( text ) => { this.setState({ titulo: text })} }
        />
        <TextInput
          placeholder={translate("DescricaoTextInput")}
          style = {this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
          underlineColorAndroid = "transparent"
          value={this.state.descricao}
          onChangeText = { ( text ) => { this.setState({ descricao: text })} }
        />
        <TextInput
          placeholder={translate("LocalizationTextInput")}
          style = {this.getStyle().TextInputStyleGreen} onLayout = {this.onLayout.bind(this)}
          underlineColorAndroid = "transparent"
          value={this.state.localizacao}
          onChangeText = { ( text ) => { this.setState({ localizacao: text })} }
        />
        </View>
        <View style={this.getStyle().part3} onLayout = {this.onLayout.bind(this)}>
        <TouchableOpacity 
          onPress={this.updateRegisto} 
          activeOpacity={0.7} 
          style={this.getStyle().TouchableOpacity} onLayout = {this.onLayout.bind(this)} >
          <Text 
            style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("UpdateButton")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.deleteRegisto}
          activeOpacity={0.7} 
          style={this.getStyle().TouchableOpacity} onLayout = {this.onLayout.bind(this)} >
          <Text 
            style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("DeleteButton")}</Text>
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
    flex: 2,
    backgroundColor: 'white',
  },
  part3: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
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
  },
  part3: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    justifyContent: 'center',
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
