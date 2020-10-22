import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import loginScreen from './loginScreen';
import signup from './signup';
import forgotPassword from './forgotPassword';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="loginScreen" component={loginScreen}/>
        <RootStack.Screen name="signUp" component={signup}/>
        <RootStack.Screen name="forgotPassword" component={forgotPassword}/>
    </RootStack.Navigator>
);

export default RootStackScreen;