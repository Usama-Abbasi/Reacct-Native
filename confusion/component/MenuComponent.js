import { View, FlatList ,TouchableOpacity} from 'react-native';
import { Tile } from 'react-native-elements';
import React, { Component } from 'react';
import {Dishdetail} from './DishdetailComponent';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }
 class Menu extends Component {
    

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
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={()=>this.props.navigation.navigate('Dishdetail',{dishId:item.id})}
                        imageSrc={{uri:baseUrl+item.image}}
                      />
            );
        };
        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{props.dishes.errMess}</Text>
                </View>            
            );
        }
        else{
          return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
              );
          }
    }
}


export default connect(mapStateToProps)(Menu);