import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import StarCal from '../components/Star';
import axios from "axios";

export default class SettingsScreen extends React.Component {
  state = {
    name: [],

  };
  
  componentDidMount(){
      axios
      .get('https://192.168.1.19:3301')
      .then(res => {
          const { data } = res
          console.log(res)
          this.setState({
          name: res.name,
          });
          
      })
      .catch((error) =>{
        console.error(error);
      });
    }

  render() {
    
    return (
     
      <View >
       <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Califica tú evento:</Text>
        </View>
        <Text  style={styles.blue} h1>{this.state.name}</Text>

        <StarCal/>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '100%',
          }}
        />
        <Button onPress={() => {}}  title="Enviar" color="blue"/>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  
  blue: {
    color: 'blue',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});