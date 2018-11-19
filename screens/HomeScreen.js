import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,ActivityIndicator,FlatList
} from 'react-native';
import { WebBrowser } from 'expo';
import Cardv from '../components/CardView';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import PropuestasScreen from '../screens/PropuestasScreen';
import { createStackNavigator, createBottomTabNavigator,StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    title:'Selecciona tú favorito',
    headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
    headerStyle: {
      backgroundColor: '#1c54b2',
      
    },
  };
  
  constructor(props){
    super(props);
    this.state ={ isLoading: true, prop: false}
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

  renderPropuesta(){
    this.setState({
      prop: !this.state.prop
     
    });
   
  }
  render() {

    const v1 =  (<View>
                  <Text>variable1</Text>
                  <CardButton title="Presióname baby" onPress={() => this.renderPropuesta()}/>
                </View>);
    const v2 =  (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
  
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Eventos:</Text>
        </View>
  
          <View >
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => 
  
              <Card>
                  <CardTitle 
                    title={item.name} 
                    />
                  <CardContent text= {item.description} />
                  <CardAction 
                  separator={true} 
                  inColumn={false}>
                  <CardButton
                      onPress={() => this.renderPropuesta()}
                      title="ver propuestas"
                      color="blue"
                  />
                  </CardAction>
                </Card>
              }
              keyExtractor={({_id}, index) => _id}
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

  if(this.state.prop){
    value = v1
  }else{
    value = v2
  }

  // if(this.state.isLoading){
  //     return(
  //       <View style={{flex: 1, padding: 20}}>
  //         <ActivityIndicator/>
  //       </View>
  //     )
  // }
  // return (<View>{value}
  //   <CardButton title="Presióname baby" onPress={() => this.renderPropuesta()}/>
  // </View>);
    return(
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
