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
          <View style={styles.body}>
              <Text style={styles.highlight}> View Body </Text>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}></Text>
                <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}> App.js </Text>
                    to change this screen and then come back to see your edits.
                </Text>
            </View>
          </View>
      );
  }

  const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        borderWidth: 4,
        borderColor: Colors.green,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      borderWidth: 4,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
  });

  export default App;