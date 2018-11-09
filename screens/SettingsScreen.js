import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import StarCal from '../components/Star';
import axios from "axios";

export default class SettingsScreen extends React.Component {
  state = {
    name: [],
    place1: [],
    place2: [],
    place3: [],
    date1: [], 
    date2: [],
    date3: [],
    time1: [], 
    time2: [],
    time3: [],

  };
  
  componentDidMount(){
      axios
      .get('https://192.168.1.19:3301')
      .then(res => {
          const { data } = res
          console.log(res)
          this.setState({
          name: res.name,
          place1: res.place1,
          place2: res.place2,
          place3: res.place3,
          date1: res.date1,
          date2: res.date2,
          date3: res.date3,
          time1: res.time1,
          time2: res.time2,
          time3: res.time3,
          
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
        <Button title="Enviar" color="blue"/>

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