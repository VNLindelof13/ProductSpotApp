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
import HomeSupermarket from '../screens/HomeSupermarket';
import Perfil from '../screens/Perfil';
import MenuSupermarket from '../screens/MenuSupermarket';
import EditPerfil from '../screens/EditPerfil';

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
        name="MenuSupermarket" 
        component={MenuSupermarket} 
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
        name="HomeSupermarket" 
        component={HomeSupermarket} 
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
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="Perfil" 
        component={Perfil} 
        />
        <Stack.Screen 
        options = {{headerShown:  false}} 
        name="EditPerfil" 
        component={EditPerfil} 
        />
      </Stack.Navigator>
  )
}

export default AuthenticationStack

const styles = StyleSheet.create({})