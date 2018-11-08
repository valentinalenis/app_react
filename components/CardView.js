import React ,{ Component } from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import axios from "axios";

class cardView extends Component {
    
    componentDidMount(){
        axios
        .get('http://192.168.1.19:3001')
        .then(res => {
        const { data } = res
        this.setState({
        dataSource: data,
        evento: data.evento,
        });
        })
        .catch((error) =>{
          console.error(error);
        });
      }
    
  
    render() {
      
      return (
        <Card>
            <CardTitle 
            title={this.evento}
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
  



/*

const cardView = (props) => {


      
    return(
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

export default cardView;
*/
