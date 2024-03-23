import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import {View, Text} from 'react-native';
import React from 'react';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
