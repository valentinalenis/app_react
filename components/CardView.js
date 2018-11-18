import React ,{ Component } from 'react';
import { Card, CardTitle, CardContent,Text, CardAction, CardButton } from 'react-native-material-cards'
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
    
    /*getAllEvents = () => {
        console.log("Acá estoy");
        axios
        .get("https://shrouded-beyond-36442.herokuapp.com/propuesta")
        .then(res => {
            console.log(res._response);

           res.response.map(e => console.log(e)(<Event obj={e}/>))
            this.setState({list:lista});
            console.log("___________________________________");
            console.log(res);
            console.log("___________________________________");
        });
        
    }

    componentDidMount(){
        console.log("Por acá también");
        axios
        .get('https://shrouded-beyond-36442.herokuapp.com/evento')
        .then(res => {
            const { data } = res
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
                time3: res.time3
            });
        })
        .catch((error) =>{
          console.error(error);
        });
      }*/
    
      
    render() {
        
        return (
            <Card>
                <CardTitle 
                title="Carrera 10k" 
                subtitle="Deporte"
                />
            <CardContent text="No todo es comida, hay que hacer deporte, gordos." />
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
        )
    }
  
}
  
  export default cardView;
  
