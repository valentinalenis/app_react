import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import StarCal from '../components/Star';
import axios from "axios";

export default class SettingsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://shrouded-beyond-36442.herokuapp.com/propuesta')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          carac: responseJson.characteristics,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name}, {item.description}, {item.characteristics.place}, {item.characteristics.votes}</Text>}
          keyExtractor={({_id}, index) => _id}
        />
        
        
      </View>
    );
  }
  /*state = {
    name: [],

  };
  
  componentDidMount(){
      axios
      .get('https://shrouded-beyond-36442.herokuapp.com/evento')
      .then(res => {
          const { data } = res
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
        <Button onPress={() => {}}  title="Enviar" color="blue"/>

    </View>
    );
  }*/
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