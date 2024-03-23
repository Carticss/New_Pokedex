import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import IndexNavigation from './src/navigation/IndexNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import {AuthProvider} from './src/contexts/AuthContext';
import {StatusBar} from 'react-native';
import * as React from 'react';
import {FavoritesProvider} from './src/contexts/FavoritesContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <AuthProvider>
        <FavoritesProvider>
          <IndexNavigation />
        </FavoritesProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
