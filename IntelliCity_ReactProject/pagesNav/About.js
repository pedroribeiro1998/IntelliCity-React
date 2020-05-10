/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View, Text, Button } from 'react-native';

 function About({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text> about component.... </Text>
       <Button
         color="orange"
         title="Logout"
         onPress={() => navigation.navigate('Login')}
       />
     </View>
   );
 }
export default About;
