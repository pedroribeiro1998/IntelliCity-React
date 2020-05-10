/*Home Screen With buttons to navigate to diffrent options*/
import React, { Component, useState} from 'react';
import { View, Text, Button, TextInput, Image, SafeAreaView } from 'react-native';

function List({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>list main...</Text>
        <Button
          onPress={() => navigation.navigate('ListDetails')}
          title="Go to details"
        />
    </View>
  );
}
export default List;
