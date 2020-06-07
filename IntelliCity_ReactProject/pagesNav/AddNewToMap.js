import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { StackActions } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';

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
      },
      filePath: {},
      userID : '',
      userData: {},
      fileData : null,
      fileUri : null,
    };

    realm = new Realm({ path: 'utilizador.realm' });
  }

  searchUser = () => {
    var user_details = realm
      .objects('utilizador');
    //console.log(user_details);
    if (user_details.length > 0) {
      console.log('Dados do user logado: ');
      console.log(user_details[0]);
      this.setState({
        userData: user_details[0],
        userID: user_details[0].id_user,
      });
    } else {
      alert('No user found');
      this.setState({
        userData: '',
      });
    }
  };


  // Multi-língua
  componentDidMount() {
    this.searchUser();
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    //get location to save lat and lng
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

  // Take Picture
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  };
  // Take Picture

  CreateReport = () => {
    let arr = {
      utilizador_id : this.state.userID,
      titulo: this.state.titulo, 
      descricao: this.state.descricao,
      localizacao : this.state.localizacao,
      fotografia: this.state.filePath.data, 
      latitude: this.state.markerPosition.latitude,
      longitude: this.state.markerPosition.longitude,
    };
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports/registoReport', {
      method: "POST",//Request Type 
      body: JSON.stringify(arr), //post body
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      alert('Report criado com sucesso!');
      //alert(JSON.stringify(responseJson));
      console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  };

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
          source={{uri: 'data:image/jpeg;base64,' + this.state.filePath.data,}}
        />
        <TouchableOpacity 
            onPress={
              this.chooseFile.bind(this)
            } 
            activeOpacity={0.7} 
            style={this.getStyle().TouchableOpacityFoto} onLayout = {this.onLayout.bind(this)} >
            <Text 
              style={this.getStyle().TouchableOpacityText} onLayout = {this.onLayout.bind(this)}
            >{translate("Picture")}</Text>
          </TouchableOpacity>
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
          <TouchableOpacity 
            onPress={
              this.CreateReport
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
  TouchableOpacityFoto: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    margin: 12,
    justifyContent: 'center',
    alignSelf: 'center',
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
  TouchableOpacityFoto: {
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    margin: 12,
    justifyContent: 'center',
    alignSelf: 'center',
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
