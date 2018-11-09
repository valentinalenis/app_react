import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'

const Event = props => {
    const obj = props.obj;
    return(
        <View>
        <Card>
            <CardTitle 
            title={obj.name}
            />
            <CardContent text={obj.place1} text={obj.date1} text={obj.time1}/>
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
            <CardTitle title={obj.name}/>
            <CardContent text={obj.place2} text={obj.date2} text={obj.time2}/>
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
            <CardTitle title={obj.name}/>
            <CardContent text={obj.place3} text={obj.date3} text={obj.time3}/>
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
    );
}

export default Event;