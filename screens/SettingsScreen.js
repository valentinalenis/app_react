import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return(
      <RadioForm
        radio_props={radio_props}
        initial={0}
        onPress={(value) => {this.setState({value:value})}}
      />
      
    );
  }
}
