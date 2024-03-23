import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Pokemon} from '../../common/interfaces/HomeTypes';
import Header from './components/Header';
import {StatsTab} from './components/StatsTab';

type DetailScreenParams = {
  Detail: {
    pokemon: Pokemon;
    comesFrom: 'fav' | 'home'
  };
};

type DetailScreenProps = NativeStackScreenProps<DetailScreenParams, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({route, navigation}) => {
  const {pokemon, comesFrom} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header pokemon={pokemon} comesFrom={comesFrom} />
      <StatsTab pokemon={pokemon} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
