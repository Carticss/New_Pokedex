import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {API_instance} from '../../../../android/app/src/providers/axios';
import {Pokemon} from '../../../common/interfaces/HomeTypes';
import {AxiosResponse} from 'axios';

export class HomeRepo {
  private static fetchPokemons = async (
    limit: number,
    offset: number,
  ): Promise<Pokemon[]> => {
    let pokemonList: Pokemon[] = [];
    for (let i = offset; i < limit + offset; i++) {
      await API_instance.get<any, any>(`pokemon/${i}`).then(res => {
        pokemonList.push(res.data);
      });
    }
    return pokemonList;
  };

  public static getPokemon = async (pokemonName: string): Promise<Pokemon> => {
    try {
      const response: AxiosResponse<Pokemon> = await API_instance.get(
        `pokemon/${pokemonName}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch Pokemon information');
    }
  };

  public static getPokemonList = async (
    limit: number,
    offset: number,
  ): Promise<Pokemon[]> => {
    try {
      const response: Pokemon[] = await this.fetchPokemons(limit, offset);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Pokemon list');
    }
  };
}
