import Menu from './MenuComponent';
import React,{Component} from 'react';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform ,Text,ScrollView,Image,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorites from './FavoriteComponent';
import Reservation from './ReservationComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    // dishes: state.dishes,
    // comments: state.comments,
    // promotions: state.promotions,
    // leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})
const HeaderOptions = {
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
      color: "#fff"            
  }
};
const Stack=createStackNavigator();
function ReservationStack(){
  return(
    <Stack.Navigator screenOptions={HeaderOptions}>
       <Stack.Screen name="Reservation" component={Reservation} 
        options={
          ({navigation}) => ({
            headerLeft: () => (
                <Icon 
                    name='menu' 
                    size={24}
                    color='white'
                    onPress={() => 
                        navigation.toggleDrawer()}
                />
            )
        
        })
        
        }/>
    </Stack.Navigator>
  );
}
function FavoriteStack(){
  return(
    <Stack.Navigator screenOptions={HeaderOptions}>
       <Stack.Screen name="Favorites" component={Favorites} 
        options={
          ({navigation}) => ({
            headerLeft: () => (
                <Icon 
                    name='menu' 
                    size={24}
                    color='white'
                    onPress={() => 
                        navigation.toggleDrawer()}
                />
            )
        
        })
        
        }/>
       <Stack.Screen name="Dishdetail" component={Dishdetail} />

    </Stack.Navigator>
  );
}
function HomeStack(){
  return(
    <Stack.Navigator screenOptions={HeaderOptions}>
       <Stack.Screen name="Home" component={Home} 
        options={
          ({navigation}) => ({
            headerLeft: () => (
                <Icon 
                    name='menu' 
                    size={24}
                    color='white'
                    onPress={() => 
                        navigation.toggleDrawer()}
                />
            )
        
        })
        
        }/>
    </Stack.Navigator>
  );
}
function AboutStack(){
  return(
    <Stack.Navigator screenOptions={HeaderOptions}>
       <Stack.Screen name="About" component={About} options={
         ({navigation}) => ({
          headerLeft: () => (
              <Icon 
                  name='menu' 
                  size={24}
                  color='white'
                  onPress={() => 
                      navigation.toggleDrawer()}
              />
          )
      
      })}/>
    </Stack.Navigator>
  );
}
function ContactStack(){
  return(
       
    <Stack.Navigator screenOptions={HeaderOptions}>
       <Stack.Screen name="Contact" component={Contact} options={
         ({navigation}) => ({
          headerLeft: () => (
              <Icon 
                  name='menu' 
                  size={24}
                  color='white'
                  onPress={() => 
                      navigation.toggleDrawer()}
              />
          )
      
      })
      }/>
    </Stack.Navigator>
  );
}
function MyStack(){
  return(
          <Stack.Navigator screenOptions={HeaderOptions}>
            <Stack.Screen name="Menu" component={Menu}  options={
              ({navigation}) => ({
                headerLeft: () => (
                    <Icon 
                        name='menu' 
                        size={24}
                        color='white'
                        onPress={() => 
                            navigation.toggleDrawer()}
                    />
                )
            
            })
            } />
            <Stack.Screen name="Dishdetail" component={Dishdetail} 
           />
          </Stack.Navigator>
  );
}
const CustomDrawerContentComponent=(props)=>(
    <ScrollView>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
          <Image
             source={require('./images/logo.png')}
             style={styles.drawerImage}
             />
        </View>
        <View style={{flex:2}}>
          <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItemList {...props}/>
    </ScrollView>  
);
const Drawer=createDrawerNavigator();
function MyDrawer(){
  return(
       <Drawer.Navigator
       drawerStyle={{backgroundColor:'#D1C4E9'}} 
       drawerContent={props=><CustomDrawerContentComponent{...props}/>}
       >
         <Drawer.Screen name="HomeStack" component={HomeStack} options={{
                   title:'Home',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}  />
         <Drawer.Screen name="AboutStack" component={AboutStack} options={{
                    title:'About Us',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
         <Drawer.Screen name="MyStack" component={MyStack} options={{
                    title:'Menu',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
         <Drawer.Screen name="ContactStack" component={ContactStack} options={{
                    title:'Contact Us',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
                <Drawer.Screen name="Reservation" component={ReservationStack} options={{
                    title:'Reserve Table',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='cutlery'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
                <Drawer.Screen name="Favorites" component={FavoriteStack} options={{
                    title:'My Favorite',
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
         
       </Drawer.Navigator>
  );
}
class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {

    return (
      
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
     
  

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);