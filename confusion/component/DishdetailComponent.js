import React, { Component } from 'react';
import { Text, View,FlatList, ScrollView, StyleSheet, Button,Modal,Alert,PanResponder } from 'react-native';
import { Card,Icon ,Input,Rating,AirbnbRating} from 'react-native-elements';
import { postFavorite,postComments } from '../redux/ActionCreators';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps=state=>{
    return{
        dishes:state.dishes,
        comments:state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComments:(dishId,rating,author,comment)=>dispatch(postComments(dishId,rating,author,comment))
})

function RenderDish(props){
    const dish=props.dish;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx < 200 )
            return true;
        else
            return false;
    }



    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (gestureState.dx  <  0 ) 
            {

                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
               
                return true;
            }
            else if(gestureState.dx > 0 && gestureState.dx < 200){
                props.onPress();
                return true;
            }
                 
               
            
            
                
        }
    })
   
    
    if(dish!=null){
        
          return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            {...panResponder.panHandlers}>
              <Card
                   featuredTitle={dish.name}
                   image={{uri:baseUrl+dish.image}}>
                       <Text style={{margin:10}}>{dish.description}</Text>
                       <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                      <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() =>props.onPress()}
                    />
                   </Card>
                   </Animatable.View>
          );
    }else{
        return(
             <View></View>
        );
    }
}
function RenderComment(props){
    const comments=props.comments;
    const renderCommentItem=({item,index})=>{
        return(
          <View key={index} style={{margin:10}}>
              <Text style={{fontSize:14}}>{item.comment}</Text>
              <Text style={{fontSize:12}}>{item.rating} Stars</Text>
              <Text style={{fontSize:12}}>{'--'+item.author+','+item.date}</Text>
          </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title="Comments">
            <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item=>item.id.toString()}/>
        </Card>
        </Animatable.View>
    );
}
class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            author:'',
            comment:'',
            rating:3
        }

    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId,rating,author,comment) {
        console.log(JSON.stringify(this.state));
        // this.toggleModal();
        this.props.postComments(dishId,rating,author,comment);
    }
    toggleComment(){
        this.toggleModal();
    }
    static navigationOptions={
        title:'Dish Details'
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    ratingCompleted(rating) {
        this.setState({rating:rating})
      }
      resetForm(){
        this.setState({
            showModal:false,
            author:'',
            comment:'',
            rating:5
        })
    }
    render(){
    const {route} =this.props
    const {dishId}=route.params
       return(
        <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => {this.markFavorite(dishId);this.toggleComment()}}/>
          <RenderComment comments={this.props.comments.comments.filter((comment)=>comment.dishId===dishId)}/>
          <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                       <View >
                       <AirbnbRating
                       count={5}
                        reviews={["1", "2","3","4","5"]}
                        defaultRating={3}
                        size={20}
                        showRating
                        onFinishRating={(value)=>{this.setState({rating:value});}}
                         />
                       </View>
                       <View >
                        
                       <Input
                          
                          placeholder="Author"
                          leftIcon={{ type: 'font-awesome', name: 'user' }}
                          value={this.state.author}
                            onChangeText={(value)=>this.setState({author:value})}
                          />
                       </View>
                       <View >
                       <Input
                          
                          placeholder="Comment"
                          leftIcon={{ type: 'font-awesome', name: 'comment' }}
                          value={this.state.comment}
                            onChangeText={(value)=>this.setState({comment:value})}
                          />
                       </View>
                       <View style={{marginTop:15}}>
                       <Button
                            onPress={()=>{this.handleComment(dishId,this.state.rating,this.state.author,this.state.comment);this.resetForm()}} 
                            title="Submit"
                            color="#512DA8"
                        />
                       </View>
                       <View style={{marginTop:15}}>
                       <Button
                            
                            onPress={() => this.toggleModal() }
                            title="Cancel"
                            color="#D1C4E9"
                        />
                       </View>
                    </View>
                </Modal>
        </ScrollView>
       );
   }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);