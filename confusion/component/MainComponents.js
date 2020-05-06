import Menu from './MenuComponent';
import React,{Component} from 'react';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform ,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack=createStackNavigator();
function HomeStack(){
  return(
    <Stack.Navigator>
       <Stack.Screen name="Home" component={Home} options={{
           headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
        }}/>
    </Stack.Navigator>
  );
}
function MyStack(){
  return(
          <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={{
           headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
        }} />
            <Stack.Screen name="Dishdetail" component={Dishdetail}
            options={{
              headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
            }}/>
          </Stack.Navigator>
  );
}

const Drawer=createDrawerNavigator();
function MyDrawer(){
  return(
       <Drawer.Navigator
       drawerStyle={{backgroundColor:'#D1C4E9'}} 
       >
         <Drawer.Screen name="HomeStack" component={HomeStack} options={{title:'Home'}} />
         <Drawer.Screen name="MyStack" component={MyStack} options={{title:'Menu'}} />
         
       </Drawer.Navigator>
  );
}
class Main extends Component {

  render() {

    return (
      
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
     
  

    );
  }
}
export default Main;
