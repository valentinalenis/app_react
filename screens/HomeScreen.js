import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  CheckBox,
  View, ActivityIndicator, FlatList
} from 'react-native';
import { WebBrowser } from 'expo';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards';
import Toast from 'react-native-simple-toast';


export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'SocialHub',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerStyle: {
      backgroundColor: '#1c54b2',

    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, prop: false, '_id': null, checked: true,
      characteristic: [],
      caracteristicas: {
        "characteristics": [
          {
            "id": 0,
            "name": null,
            "value": null,
            "category": null,
            "votes": 0
          }
        ]

      }
    }
  }


  categoria = ["Hora del evento", "Lugar", "Fecha del evento", "Regla"]
  caracArray = []


  renderPropuesta = id => {
    console.log("Pasé por acá");
    this.setState({
      prop: !this.state.prop,
      '_id': id,
      characteristic: []
    });
    this.getCategory(id);

  }


  componentDidMount = () => {
    let responseVal = '';
    return fetch('https://shrouded-beyond-36442.herokuapp.com/propuesta')
      .then(response => {
        responseVal = response;
        return response.text()
      })
      .then(responseJson => {
        console.log(responseJson);
        const json = this.tryParseJSON(responseJson);
        if(json){
          this.setState({
            isLoading: false,
            dataSource: json,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCategory = (id) => {
    const list = [];
    this.categoria.forEach((e, index) => {
      return fetch(`https://shrouded-beyond-36442.herokuapp.com/getByCategoryByEventId?id=${id}&&category=${e}`)
        .then(response => {
          return response.text();
        })
        .then(responseJson => {
          console.log(responseJson);
          const json = this.tryParseJSON(responseJson);
          if(json){
            json.forEach(e => {
              e.checked = false;
              list.push(e);
            });
            if(index === this.categoria.length - 1) {
              this.setState({
                isLoading: false,
                dataSource2: json,
                caracteristicas: { characteristics: json },
                characteristic: [...list]
              });
            }
          }

        })
        .catch((error) => {
          console.error(error);
        });
    })

  };

  capitalizeFirstLetter = string => { return string.charAt(0).toUpperCase() + string.slice(1); }

  checkInput = id => {
    const checked = [...this.state.characteristic];
    const itemIndex = checked.findIndex(e => e._id === id);
    const item = checked[itemIndex];
    item.checked = !item.checked;
    checked[itemIndex] = item;
    //console.warn(checked);
    //console.warn(item);
    this.setState({ characteristic: [...checked] });
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

  render() {
    let counter = 0;
    const v1 = (
      <View style={{ flex: 1, padding: 7 }}>

        <View style={styles.getStartedContainer} style={styles.contentContainer}>
          <Text style={styles.getStartedText}>Elige las características para el evento:</Text>
        </View>
        <FlatList
          key={1}
          data={this.state.characteristic}
          renderItem={({ item }) =>
            <View key={item.id}>
              <Text>{this.capitalizeFirstLetter(item.name)}</Text>
              <View style={styles.check}>
                <View style={styles.check}>
                  <CheckBox
                    key={item.id}
                    containerViewStyle={{ backgroundColor: 'blue' }}
                    checked={item.checked}
                    onPress={() => this.checkInput(item.id)}
                  />
                  <Text style={{ marginTop: 5 }}>{item.value}</Text>
                </View>

              </View>

            </View>
          }
          keyExtractor={item => {console.log("Aquel:" + counter); counter; counter++}}

        />
        <CardButton color="blue" title="Votar" onPress={() => { Toast.show('Votación exitosa'); this.renderPropuesta() }} />
      </View>
    );

    const v2 = (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.getStartedText}>Eventos:</Text>
        </View>
        <View >
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <Card>
                <CardTitle style={styles.title}
                  title={item.name}
                />
                <CardContent text={item.description} />
                <CardAction
                  separator={true}
                  inColumn={false}>
                  <CardButton
                    onPress={() => this.renderPropuesta(item._id)}
                    title="ver propuestas"
                    color="blue"
                  />
                </CardAction>
              </Card>
            }
            keyExtractor={({ _id }, index) => _id}
          />
        </View>
      </ScrollView>
    );
    // (
    //               <View style={styles.container}>
    //                 <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    //                   <View style={styles.welcomeContainer}>
    //                     <Image
    //                       source={
    //                         __DEV__
    //                           ? require('../assets/images/robot-dev.png')
    //                           : require('../assets/images/robot-prod.png')
    //                       }
    //                       style={styles.welcomeImage}
    //                     />
    //                   </View>

    //                   <View style={styles.getStartedContainer}>
    //                     <Text style={styles.getStartedText}>Eventos:</Text>
    //                   </View>
    //                 </ScrollView>
    //               </View>
    //             );

    let value;

    if (this.state.prop) {
      value = v1
    } else {
      value = v2
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    // return (<View>{value}
    //   <CardButton title="Presióname baby" onPress={() => this.renderPropuesta()}/>
    // </View>);
    //console.warn(this.state.characteristic)
    return (
      <View style={styles.container}>
        {value}
      </View>
    )
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentMsodeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}



const styles = StyleSheet.create({
  check: {
    flexDirection: 'row',
    flex: 10,
    backgroundColor: '#D5E0E850',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 7,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    padding: 7,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 22,
    color: '#1c54b2',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
