import {useCallback, useEffect, useMemo, useState} from 'react';
import {Pokemon} from '../interfaces/HomeTypes';
import debounce from 'lodash/debounce';

const usePokemonSearch = (pokemonList: Pokemon[], query: string) => {
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);

  const searchPokemon = useCallback(() => {

    if (query === '') {
        setSearchResult(pokemonList)
        return;
    }

    if (!query.trim()) {
      setSearchResult([]);
      return;
    }

    const id = parseInt(query);
    if (!isNaN(id)) {
      const pokemon = pokemonList.find(p => p.id === id);
      setSearchResult(pokemon ? [pokemon] : []);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const typeMatches = pokemonList.filter(pokemon =>
      pokemon.types.some((type: {type: {name: string}}) =>
        type.type.name.toLowerCase().includes(lowerCaseQuery),
      ),
    );
    const nameMatches = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowerCaseQuery),
    );

    setSearchResult([...typeMatches, ...nameMatches]);
  }, [query, pokemonList]);

  const debouncedSearch = useMemo(
    () => debounce(searchPokemon, 300),
    [pokemonList, query],
  );

  useEffect(() => {
    debouncedSearch();
    return debouncedSearch.cancel;
  }, [query, debouncedSearch]);

  return searchResult;
};

export default usePokemonSearch;
