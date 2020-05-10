import React, { Component, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';

import {LocalizationContext} from '../services/localization/LocalizationContext';

  function Map_Screen({route, navigation}) {
    const { username } = route.params;
    const { password } = route.params;
    const {translations} = useContext(LocalizationContext);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
        Param recebido: {username}
        Param recebido: {password}
        </Text>
        <Button title="Go to Home screen" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  export default Map_Screen;

  
const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
  },
  part1: {
    flex: 1,
//    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    flex: 2,
  //  backgroundColor: 'blue',
  },
  part3: {
    flex: 1,
  //  backgroundColor: 'red',
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