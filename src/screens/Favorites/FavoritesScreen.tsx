import {View, FlatList, StyleSheet, ImageBackground, TextInput} from 'react-native';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import PokemonCard from '../Home/components/PokemonCard/PokemonCard';
import usePokemonSearch from '../../common/hooks/useSearchPokemon';
import {useFavorites} from '../../contexts/FavoritesContext';
import React, {useEffect, useMemo, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FavoritesScreen = () => {
  const {favorites} = useFavorites();

  const [query, setQuery] = useState('');

  const searchResult = usePokemonSearch(favorites, query);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={StyleSheet.absoluteFill}
        source={require('../../common/assets/body_bg.png')}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokemon..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />
      <Animated.FlatList
        entering={SlideInRight}
        exiting={SlideOutLeft}
        data={searchResult}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <PokemonCard key={item.id} pokemon={item} comesFrom='fav' />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: wp('80%'),
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    backgroundColor: 'white'
  },
});

export default FavoritesScreen;
