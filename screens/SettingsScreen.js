import React from 'react';
import { View, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, CardTitle, CardContent, Text, CardAction, CardButton } from 'react-native-material-cards'
import StarCal from '../components/Star';
import Toast from 'react-native-simple-toast';

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'SocialHub',
    headerTintColor: '#fff',
    titleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
    headerStyle: {
      backgroundColor: '#1c54b2',

    },
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  tryParseJSON = jsonString => {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) { }

    return false;
  };

  componentDidMount() {
    const list = [];
    return fetch('https://shrouded-beyond-36442.herokuapp.com/evento/findFinalizedEvents')
      .then(response => {
        return response.text();
      })
      .then(responseJson => {
        console.log(responseJson);
        const json = this.tryParseJSON(responseJson);
        if (json) {
          json.forEach(e => {
            e.checked = false;
            list.push(e);
          });

          this.setState({
            isLoading: false,
            dataSource:json,
            carac: json.characteristics,
          }, function () {

          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    const characteristics = this.state.dataSource;
    return (

      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>

            <Card>
              <CardTitle
                title={item.name}
              />
              <CardContent text={item.description} />
              <StarCal />
              <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                  onPress={() => { Toast.show('Calificación exitosa'); }}
                  title="Calificar"
                  color="blue"
                />
              </CardAction>
            </Card>
          }
          keyExtractor={item => { console.log(item._id); item._id }}
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