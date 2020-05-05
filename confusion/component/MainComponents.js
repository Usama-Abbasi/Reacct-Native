import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
const MenuNavigator=createStackNavigator({
  Menu:{screen:Menu,
  navigationOptions:{
    headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      color: "#fff"            
  }
  }},
  Dishdetail:{screen:Dishdetail,
  navigationOptions:{
    headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      color: "#fff"            
  }
  }}
},
{
  initialRouteName: 'Menu',
 
},
);
const Container = createAppContainer(MenuNavigator);
class Main extends Component {
  
  render() {
 
    return (
      
      

        
        <Container/>

    );
  }
}
  
export default Main;