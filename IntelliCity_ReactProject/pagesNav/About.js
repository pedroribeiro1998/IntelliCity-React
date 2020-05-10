/*Home Screen With buttons to navigate to diffrent options*/
//import React from 'react';
import React, { Component, useState, useContext, useEffect } from 'react';

import { View, Text, Button } from 'react-native';
import {LocalizationContext} from '../services/localization/LocalizationContext';

 function About({ navigation }) {
  const {translations} = useContext(LocalizationContext);

   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text> about component.... </Text>
       <Button
         color="orange"
         title = {translations.logout}
         onPress={() => navigation.navigate('Login')}
       />
     </View>
   );
 }
export default About;
