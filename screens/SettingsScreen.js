import React from 'react';
import { View, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { Card, CardTitle, CardContent,Text, CardAction, CardButton } from 'react-native-material-cards'
import StarCal from '../components/Star';
//import axios from "axios";

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    title:'Califica tú evento',
    headerTintColor: '#fff',
     titleStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
      },
    headerStyle: {
      backgroundColor: '#1c54b2',
      
    },
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://shrouded-beyond-36442.herokuapp.com/evento')
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
    const characteristics = this.state.dataSource;
    return(

      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

           <Card>
                <CardTitle 
                title={item.name} 
                />
              <CardContent text= {item.description} />
              <StarCal/>
              <CardAction 
              separator={true} 
              inColumn={false}>
              <CardButton
                  onPress={() => {}}
                  title="Calificar"
                  color="blue"
              />
              </CardAction>
             </Card>
          }
          keyExtractor={({_id}, index) => _id}
        />
       
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