import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pokemon} from '../common/interfaces/HomeTypes';

interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

interface FavoritesContextProviderProps {
  children: React.ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<FavoritesContextProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = async (pokemon: Pokemon) => {
    try {
      setFavorites(prevFavorites => [...prevFavorites, pokemon]);
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, pokemon]),
      );
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      setFavorites(prevFavorites =>
        prevFavorites.filter(pokemon => pokemon.id !== id),
      );
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter(pokemon => pokemon.id !== id)),
      );
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some(pokemon => pokemon.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{favorites, addFavorite, removeFavorite, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};
