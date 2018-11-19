import { View, Button, StyleSheet, FlatList, ActivityIndicator,Text, TouchableOpacity} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import React, { Component } from "react";
import Modal from "react-native-modal";
import Cardv from '../components/CardView';
import { createStackNavigator, createBottomTabNavigator,StackNavigator } from 'react-navigation';


export default class PropuestasScreen extends React.Component {

    static navigationOptions = {
      title:'Propuestas',
      headerTintColor: '#fff',
       titleStyle: {
          fontWeight: 'bold',
          textAlign: 'center'
        },
      headerStyle: {
        backgroundColor: '#1c54b2',
        
      },
      
    };
  
    state = {
      isModalVisible: false
    };
  
    _toggleModal = () =>
      this.setState({ isModalVisible: !this.state.isModalVisible });
  
    render() {
      const App = StackNavigator({
        Home: { screen: HomeScreen },
        Profile: { screen: PropuestasScreen },
      });
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this._toggleModal}>
            <Text>Show Modal</Text>
          </TouchableOpacity>
          <Modal style={styles} isVisible={this.state.isModalVisible} >
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>
              <TouchableOpacity onPress={this._toggleModal}>
                <Text>Hide me!</Text>
                <Cardv/>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    
      height: 300,
      width: 300,
      
  })