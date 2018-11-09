import React ,{ Component } from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import axios from "axios";
import {View} from 'react-native';
import Event from './Event';

const API_URL = ':3001';

class cardView extends Component {
    state = {
      name: 0,
      place1: 0,
      place2: 0,
      place3: 0,
      date1: 0, 
      date2: 0,
      date3: 0,
      time1: 0, 
      time2: 0,
      time3: 0,
      list: []
    };
    
    getAllEvents = () => {
        axios
        .get("https://shrouded-beyond-36442.herokuapp.com/propuesta")
        .then(res => {
            list = res.map(e => (<Event obj={e}/>))
        });
    }

    componentDidMount(){
        axios
        .post('https://shrouded-beyond-36442.herokuapp.com/evento')
        .then(res => {
            getAllEvents();
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
            {list.map(e => e)}
        </View>
      )
    }
  
}
  
  export default cardView;
  
