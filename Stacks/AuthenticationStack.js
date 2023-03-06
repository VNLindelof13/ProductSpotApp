import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';
import Menu from '../screens/Menu';
import SupermarketDetails from '../screens/SupermarketDetails';
import ProductDetails from '../screens/ProductDetails';
import AddProduct from '../screens/AddProduct';
import SupermarketFilter from '../screens/SupermarketFilter'
import Gamification from '../screens/Gamification';

const Stack = createNativeStackNavigator();
function AuthenticationStack()  {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="Login" 
        component={LoginScreen} 
        />

        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="Home" 
        component={HomeScreen}
        />

        <Stack.Screen 
        name="Register" 
        options = {{headerShown:  false}}
        component={Register}
        />

        <Stack.Screen 
        name="ForgotPassword" 
        options = {{headerShown:  false}}
        component={ForgotPassword} 
        />
        <Stack.Screen 
        name="Menu" 
        options = {{headerShown:  false}}
        component={Menu} 
        />      
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="SupermarketDetails" 
        component={SupermarketDetails} 
        />
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="ProductDetails" 
        component={ProductDetails} 
        />
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="AddProduct" 
        component={AddProduct} 
        />

        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="SupermarketFilter" 
        component={SupermarketFilter} 
        />
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="Gamification" 
        component={Gamification} 
        />
      </Stack.Navigator>
  )
}

export default AuthenticationStack

const styles = StyleSheet.create({})