import React, {Component} from 'react';
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

/*
        <Image
            style={styles.stretch}
            source={require('./IntelliCity_ReactProject/Images/react.png')}
          />
*/
function App(){
    return (
      <View style={styles.full}>
        <View style={styles.part1}>
        <Image
            style={styles.stretch}
          />
        </View>
        <View style={styles.part2}>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
          />
          <View style={styles.buttonview}>
            <Button
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
  stretch: {
    flex: 1,
    width: 150,
    height: 150,
},
});


export default App;