import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { StackActions } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';
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

export default class Map extends React.Component{
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config

    this.state = {
      screen: Dimensions.get('window'),
      data: [],
      MyReports: [],
      OthersReports: [],
      latitude: null,
      longitude: null,
      initialPosition: {
        latitude: 41.693447,
        longitude: -8.846955,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      }
    };

    this.reloadData();
  }

  reloadData = () => {
    this.GetMyReports();
    this.GetOthersReports();
  }

  watchID: ?number = null
  
  componentDidMount() {
    // Multi-língua
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    //Get reports from API
    //this.GetAllReports();
    this.GetMyReports();
    this.GetOthersReports();
    //Geolocation
    Geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var inicialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }

        this.setState({initialPosition: inicialRegion})
        this.setState({markerPosition: inicialRegion})
      },
      error => Alert.error('Error', JSONstringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    this.watchID = Geolocation.watchPosition(position => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      var newRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }

      this.setState({initialPosition: newRegion})
      this.setState({markerPosition: newRegion})
    });
  }
  componentWillUnmount() {
    // Multi-língua
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    //Geolocation
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  // Multi-língua
  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };
  
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

  GetAllReports = () => {
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports_detalhe')
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      this.setState({data: responseJson.DATA});
      //alert(JSON.stringify(responseJson.DATA));
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }

  GetMyReports = () => {
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports_detalhe/my/1')
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      this.setState({MyReports: responseJson.DATA});
      //alert(JSON.stringify(responseJson.DATA));
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }

  GetOthersReports = () => {
    fetch('https://intellicity.000webhostapp.com/myslim_commov1920/api/reports_detalhe/others/1')
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      this.setState({OthersReports: responseJson.DATA});
      //alert(JSON.stringify(responseJson.DATA));
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }

  actionOnRow(marker) {
    this.props.navigation.navigate('ListDetails', marker);
 }

  render(){
    return(
      <View style={this.getStyle().MainContainer} onLayout = {this.onLayout.bind(this)} >
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={this.getStyle().map} onLayout = {this.onLayout.bind(this)}
            region={this.state.initialPosition}
          >
            <Marker
              coordinate={this.state.markerPosition}
              pinColor = {'green'}
              onPress={() => this.props.navigation.navigate('AddNewToMap')}
              >
            </Marker>

          {
            this.state.MyReports.map(marker => (
              <Marker
                key={marker.id}
                pinColor = {'blue'}
                onPress={ () => this.actionOnRow(marker)}
                coordinate={
                  {
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude)
                  }
                }>
                    <Callout>
                      <Text>{marker.titulo} - {marker.descricao}</Text>
                    </Callout>
              </Marker>
            ))
          }
          {
            this.state.OthersReports.map(marker => (
              <Marker
                key={marker.id}
                pinColor = {'red'}
                coordinate={
                  {
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude)
                  }
                }>
                    <Callout>
                      <Text>{marker.titulo} - {marker.descricao}</Text>
                    </Callout>
              </Marker>
            ))
          }
          </MapView>
      </View>
    );
  }
}


const portraitStyles = StyleSheet.create({
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
