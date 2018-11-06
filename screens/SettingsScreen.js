import React from 'react';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { View, Text, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  
  onSelect(index, value){
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View >
      <RadioGroup  onSelect = {(index, value) => this.onSelect(index, value)} >
        <RadioButton value={'item1'} >
          <Text>This is item #1</Text>
        </RadioButton>
 
        <RadioButton value={'item2'}>
          <Text>This is item #2</Text>
        </RadioButton>
 
        <RadioButton value={'item3'}>
          <Text>This is item #3</Text>
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
