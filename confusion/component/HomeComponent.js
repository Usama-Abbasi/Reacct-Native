import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Home extends Component {

    static navigationOptions = {
        title:"Home",
              headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            } 
      };
          
    

    render() {
        return(
            <View><Text>Home Component</Text></View>
        );
    }
}

export default Home;