import axios from 'axios';

export const API_instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});
