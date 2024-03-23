import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {View, StyleSheet, ImageBackground, TextInput} from 'react-native';
import usePokemonSearch from '../../common/hooks/useSearchPokemon';
import PokemonCard from './components/PokemonCard/PokemonCard';
import useHomeScreen from './hooks/useHomeScreen';
import React, {ReactElement, useMemo, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = () => {
  const limit = useMemo(() => 10, []);

  const [offset, setOffset] = useState(1);
  const [query, setQuery] = useState('');

  const {pokemonList} = useHomeScreen({
    limit,
    offset,
  });

  const searchResult = usePokemonSearch(pokemonList, query);

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
          return <PokemonCard key={item.id} pokemon={item} comesFrom='home' />;
        }}
        onEndReached={() => setOffset(prev => prev + limit)}
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

export default HomeScreen;
