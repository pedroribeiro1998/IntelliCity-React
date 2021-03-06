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
  FlatList ,
  TouchableWithoutFeedback
} from 'react-native';

import Realm from 'realm';
let realm;

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

export default class List extends React.Component{
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config

    realm = new Realm({ path: 'reports.realm' });
    var reports = realm.objects('report');

    this.state = {
      screen: Dimensions.get('window'),
      titulo : '',
      descricao : '',
      localizacao : '',
      FlatListItems: reports,
      WSreports: [],
    };

    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  reloadData = () => {
    this.setState({FlatListItems: realm.objects('report')});
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 2, width: '100%', backgroundColor: '#000' }} />
    );
  };

  GetAllReports = () => {
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports_detalhe')
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      this.setState({WSreports: responseJson.DATA});
      //alert(JSON.stringify(responseJson.DATA));
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }
  
  // Multi-língua
  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    this.GetAllReports();
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

  actionOnRow(item) {
    this.props.navigation.navigate('ListDetails', item);
 }

 /*
         <FlatList
           data= {this.state.WSreports}
           renderItem={({ item }) => (
             <TouchableOpacity >
                <Text>Nome: {item.nome}</Text>
                <Text>titulo: {item.titulo}</Text>
            </TouchableOpacity>
           )}
           keyExtractor= {item=>item.id}
        />
 */
  render(){    
    return(
      <View style={this.getStyle().MainContainer} onLayout = {this.onLayout.bind(this)} >
        <FlatList
          data={this.state.WSreports}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'lightblue'
              }}>
                <Image
                  source={{
                    uri: 'https://intellicity.000webhostapp.com/myslim_commov1920/report_photos/' + item.fotografia,
                  }}
                  style={{width: 100, height: 100, margin: 10}} >
                </Image>
                <View style={{ flex: 1, flexDirection: 'column', margin:10 }}>
                  <Text>{translate("Id:")} {item.id}</Text>
                  <Text>{translate("titulo:")} {item.titulo}</Text>
                  <Text>{translate("descricao:")} {item.descricao}</Text>
                  <Text>{translate("localizacao:")} {item.localizacao}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
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
  MainContainer :{
    flex:1,
    justifyContent: 'center',
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    flexDirection: 'column',
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
  MainContainer :{
     flex:1,
     justifyContent: 'center',
     paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
     flexDirection: 'row',
  },
});
