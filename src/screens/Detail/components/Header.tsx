import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {capitalize} from 'lodash';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFavorites} from '../../../contexts/FavoritesContext';
import {Pokemon} from '../../../common/interfaces/HomeTypes';
import getColorByPokemonType from '../../../common/constants/Constants';

interface HeaderProps {
  pokemon: Pokemon;
  comesFrom: 'fav' | 'home'
}

export default function Header({pokemon, comesFrom}: HeaderProps) {
  const {id, name, sprites, types} = pokemon;
  const color = getColorByPokemonType(types[0].type.name);
  const navigation = useNavigation();

  const {addFavorite, isFavorite, removeFavorite} = useFavorites();

  const bgStyle = [{backgroundColor: color, ...styles.bg}];

  const handleFavoriteToggle = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <>
      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutLeft}
        style={bgStyle}
      />
      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutLeft}
        style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../common/assets/back_arrow.png')}
            style={{
              width: 40,
              height: 40,
              position: 'absolute',
              left: -35,
              top: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoriteToggle}>
          {isFavorite(pokemon.id) ? (
            <Image
              source={require('../../../common/assets/star_filled.png')}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                right: -35,
                top: 10,
              }}
            />
          ) : (
            <Image
              source={require('../../../common/assets/star_white.png')}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                right: -35,
                top: 10,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.header}>
          <Image
            source={require('../../../common/assets/white_pokeball.png')}
            style={{
              width: 200,
              height: 200,
              position: 'absolute',
              top: 120,
              opacity: 0.1,
            }}
          />
          <Text style={styles.name}>{capitalize(name)}</Text>
          <Text style={styles.id}>#{`${id}`.padStart(3, '0')}</Text>
        </View>
        <View style={styles.contentImg}>
          <Animated.Image
            source={{uri: sprites.front_default!}}
            style={styles.image}
            sharedTransitionTag={`pokemon_pic_${pokemon.id}_${comesFrom}`}
          />
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 400,
    position: 'absolute',
    top: 0,
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{scaleX: 2}],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  id: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentImg: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
