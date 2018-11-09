import React ,{ Component } from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import axios from "axios";
import {View} from 'react-native';

class cardView extends Component {
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
          <View>
            <Card>
                <CardTitle 
                title={this.state.name}
                />
                <CardContent text={this.state.place1}/>
                <CardContent text={this.state.date1}/>
                <CardContent text={this.state.time1}/>
                <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    onPress={() => {}}
                    title="Like"
                    color="blue"
                />
                </CardAction>
            </Card>

            <Card>
                <CardTitle 
                title={this.state.name}
                />
                <CardContent text={this.state.place2}/>
                <CardContent text={this.state.date2}/>
                <CardContent text={this.state.time2}/>
                <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    onPress={() => {}}
                    title="Like"
                    color="blue"
                />
                </CardAction>
            </Card>

            <Card>
                <CardTitle 
                title={this.state.name}
                />
                <CardContent text={this.state.place3}/>
                <CardContent text={this.state.date3}/>
                <CardContent text={this.state.time3}/>
                <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    onPress={() => {}}
                    title="Like"
                    color="blue"
                />
                </CardAction>
            </Card>
        </View>
      )
    }
  
}
  
  export default cardView;
  
