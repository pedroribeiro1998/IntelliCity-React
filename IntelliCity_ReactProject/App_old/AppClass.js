import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login_Screen from '../pagesClass/Login_ScreenClass';
import Registar_Screen from '../pagesClass/Registar_ScreenClass';
import ReportsList_Screen from '../pagesClass/ReportsList_ScreenClass';
import Map_Screen from '../pagesClass/Map_ScreenClass';


/*******************/ 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login_Screen">
        <Stack.Screen 
          name="Login_Screen" 
          component={Login_Screen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Registar_Screen" 
          component={Registar_Screen}
          options={{ title: 'Registar' }}
        />
        <Stack.Screen 
          name="ReportsList_Screen" 
          component={ReportsList_Screen}
          options={{ title: 'Lista de Reports' }}
        />
        <Stack.Screen 
          name="Map_Screen" 
          component={Map_Screen}
          options={{ title: 'Mapa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/****************** */
/*
export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.full}>
      <View style={styles.part1}>
      <Image
          style={styles.image}
          source={require('./Images/react.png')}
        />
      </View>
      <View style={styles.part2}>
        <TextInput
          style={styles.textinput}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />
        <Text style={styles.textinput2}>
        {username + ' - ' + password}
        </Text>
        <View style={styles.buttonview}>
          <Button
            onPress={() => {
                alert('Login com username=' + username + ' e password=' + password);
            }}
            color="blue"
            title="Login"
          />
        </View>
      </View>
      <View style={styles.part3}>
          <Button
            color="orange"
            title="Acesso anonimo"
          />
      </View>
    </View>
  );
}


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
*/
