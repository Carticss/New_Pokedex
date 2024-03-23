import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigation from './AuthNavigation';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import DetailScreen from '../screens/Detail/DetailScreen';

const Stack = createNativeStackNavigator();

export default function IndexNavigation() {
  const { user, loading } = useAuth();

  while (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Determine initial route based on user login status
  const initialRoute = user === null ? 'Auth' : 'Main';

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
