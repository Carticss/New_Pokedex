import {ActivityIndicator} from 'react-native';
import {Pokemon} from '../../../common/interfaces/HomeTypes';
import {HomeRepo} from '../repository/HomeRepo';
import {useState, useEffect} from 'react';

const useHomeScreen = ({limit, offset}: {limit: number; offset: number}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchPokemonList = async (limit: number, offset: number) => {
    setLoading(true);
    try {
      const data = await HomeRepo.getPokemonList(limit, offset);
      setPokemonList(prev => {
        return [...prev, ...data];
      });
      setLoading(false);
    } catch (error) {
      console.error('miau', error);
      setError('Failed to fetch Pokemon list');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(limit, offset);
  }, [offset]);

  const fetchPokemon = async (pokemonName: string) => {
    setLoading(true);
    try {
      const data = await HomeRepo.getPokemon(pokemonName);
      setPokemon(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch Pokemon information');
      setLoading(false);
    }
  };

  return {pokemon, pokemonList, loading, error, fetchPokemon};
};

export default useHomeScreen;
