import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import getColorByPokemonType from '../../../../common/constants/Constants';
import {Pokemon} from '../../../../common/interfaces/HomeTypes';
import {useNavigation} from '@react-navigation/native';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {capitalize} from 'lodash';
import React from 'react';

const PokemonCard = (props: {pokemon: Pokemon, comesFrom: 'fav' | 'home'}) => {
  const {pokemon, comesFrom} = props;

  const pokemonColor = getColorByPokemonType(pokemon.types[0].type.name);
  const bgStyles = {backgroundColor: pokemonColor, ...styles.card};
  const navigation = useNavigation();

  const goToPokemon = () => {
    navigation.navigate('Detail', {
      pokemon,
      comesFrom,
    });
  };

  return (
    <TouchableOpacity onPress={goToPokemon}>
      <Animated.View
        style={bgStyles}
        entering={SlideInRight}
        exiting={SlideOutLeft}>
        <View style={styles.title}>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <Text style={styles.id}>#{`${pokemon.id}`.padStart(3, '0')}</Text>
        </View>
        <View style={styles.types}>
          <Text style={styles.typeText}>
            {capitalize(pokemon.types[0].type.name)}
          </Text>
          {pokemon.types[1] && (
            <Text style={styles.typeText}>
              {capitalize(pokemon.types[1].type.name)}
            </Text>
          )}
        </View>
        <Animated.Image
          source={{uri: pokemon.sprites.front_default!}}
          style={styles.image}
          sharedTransitionTag={`pokemon_pic_${pokemon.id}_${comesFrom}`}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: 250,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 25,
  },
  bgStyles: {
    borderRadius: 15,
    padding: 10,
  },
  id: {
    color: '#fff',
    fontSize: 11,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  types: {
    marginTop: 5,
  },
  typeText: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 25,
    width: 60,
  },
  image: {
    position: 'absolute',
    aspectRatio: 1,
    bottom: -10,
    right: -10,
    width: 140,
  },
});
