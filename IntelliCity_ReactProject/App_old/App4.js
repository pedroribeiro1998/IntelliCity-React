import React from 'react';
import {
    StyleSheet,
    View,
    Text
  } from 'react-native';
  
  import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';
//Novo layout
  function App(){
      return(
          <View style={styles.full}>
            <View style={styles.half1}>
                <Text style={styles.text}> This is 1</Text>
            </View>
            <View style={styles.half2}>
                <View style={styles.half21}>
                    <Text style={styles.text}> This is 2/3</Text>
                </View>
                <View style={styles.half22}>
                    <Text style={styles.text}> This is 1/3</Text>
                </View>
            </View>
          </View>
      );
  }

  const styles = StyleSheet.create({
    full: {
        flex: 1,
    },
    halfx: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    half1: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    half2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
    half21:{
        flex: 2,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    half22:{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',       // alinhar vertical
        alignItems: 'center',           // alinhar horizontal
    },
    text:{
        color: 'black',
        fontSize: 25,
    },
  });

  export default App;