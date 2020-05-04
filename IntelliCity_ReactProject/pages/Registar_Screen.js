import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';

function Registar_Screen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    return (
      /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>*/
    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');


    <View style={styles.full}>
      <View style={styles.part1}>
      <Text style={styles.text}>
        Inserir dados do novo utilizador
        </Text>
      </View>
      <View style={styles.part2}>
      <TextInput
          style={styles.textinput}
          placeholder="Nome"
          onChangeText={nome => setNome(nome)}
          defaultValue={nome}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Username"
          onChangeText={username => setUsername(username)}
          defaultValue={username}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          onChangeText={password => setPassword(password)}
          defaultValue={password}
        />

        <Text style={styles.textinput2}>
        {'dados inseridos: '+ nome + ' - ' + username + ' - ' + password}
        </Text>

        <View style={styles.buttonview}>
          <Button
          onPress={() => {
            alert(nome + ' registado com sucesso!');
            navigation.navigate('Login_Screen');
          }}
            color="green"
            title="Registar"
          />
        </View>
      </View>
    </View>
    );
  }

  export default Registar_Screen;

  
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