import React, { Component, useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';

import {LocalizationContext} from '../services/localization/LocalizationContext';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function Login_Screen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {translations} = useContext(LocalizationContext);
    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window, screen }) => {
      setDimensions({ window, screen });
    };

    useEffect(() => {
      Dimensions.addEventListener("change", onChange);
      return () => {
        Dimensions.removeEventListener("change", onChange);
      };
    });

    return (
      /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>*/
    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');


    <View style={dimensions.window.height > dimensions.window.width ? styles.fullP : styles.fullL}>
      <View style={styles.part1}>
      <Image
          style={styles.image}
          source={require('../Images/react.png')}
        />
      </View>
      <View style={styles.part2}>
        <TextInput
          style={styles.textinput}
          placeholder={translations.UsernameTextInput}
          onChangeText={username => setUsername(username)}
          defaultValue={username}
        />
        <TextInput
          style={styles.textinput}
          placeholder={translations.PasswordTextInput}
          onChangeText={password => setPassword(password)}
          defaultValue={password}
        />
        
        <View style={styles.buttonview}>
          <Button
            onPress={() => {
              alert('Login com username=' + username + ' e password=' + password);

              navigation.navigate('Map_Screen', {
                username : username,
                password : password,
              });
            }}
            color="blue"
            title={translations.LoginButton}
          />
        </View>
        <View style={styles.buttonview}>
          <Button
            onPress={() => {
              //alert('Vamos registar!');
              navigation.navigate('Registar_Screen');
            }}
            color="green"
            title={translations.RegistarButton}
          />
        </View>
      </View>
      <View style={styles.part3}>
          <Button
          onPress={() => {
            //alert('Vamos registar!');
            navigation.navigate('ReportsList_Screen');
          }}
            color="orange"
            title={translations.ReportsListButton}
          />
      </View>
    </View>
    );
  }

  export default Login_Screen;

  
const styles = StyleSheet.create({
  fullP: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
  },
  fullL: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'gray',
  },
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