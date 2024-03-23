import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import {Image} from 'react-native';
import React from 'react';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeIndicatorStyle={{
        height: 90,
      }}>
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../common/assets/star.png')}
              style={{width: 40, height: 40, top: -5}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image
              source={require('../common/assets/pokeball.png')}
              style={{width: 75, height: 75, top: -10}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../common/assets/profile.png')}
              style={{width: 35, height: 35, top: -5}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
