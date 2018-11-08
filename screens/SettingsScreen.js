import React from 'react';
import Card from '../components/CardView';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { View, Text, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  
  onSelect(index, value){
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  render() {
    
    return (
      <View >
      <RadioGroup  onSelect = {(index, value) => this.onSelect(index, value)} >
        <RadioButton value={'item1'} >
          <Text>1 Estrella</Text>
        </RadioButton>
 
        <RadioButton value={'item2'}>
          <Text>2 Estrellas</Text>
        </RadioButton>
 
        <RadioButton value={'item3'}>
          <Text>3 Estrellas</Text>
        </RadioButton>
      </RadioGroup>
      <Button
        title="Enviar"
        color="blue"
        />
       
    </View>
    );
  }
}
