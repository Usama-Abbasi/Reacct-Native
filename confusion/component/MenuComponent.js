import { View, FlatList ,TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements';
import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import {Dishdetail} from './DishdetailComponent';
 class Menu extends Component {
     constructor(props){
         super(props);
         this.state={
             dishes:DISHES
         }
     }

    static navigationOptions={
        title:"Home",
              headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        
    }
   
    render(){
        const {navigate}=this.props.navigation;
        const renderMenuItem = ({item, index}) => {

            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={()=>this.props.navigation.navigate('Dishdetail',{dishId:item.id})}
                        leftAvatar={{ source: require('./images/uthappizza.png')}}
                      />
            );
        };
    return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
}


export default Menu;