import React from 'react';
import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  let renderAPI: RenderAPI;

  beforeEach(() => {
    renderAPI = render(<HomeScreen />);
  });

  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = renderAPI;

    // Check if the search input and placeholder text are rendered
    const searchInput = getByPlaceholderText('Search Pokemon...');
    expect(searchInput).toBeTruthy();

    // Check if the Pokemon list is rendered
    const bulbasaurPokemon = getByText('bulbasaur');
    expect(bulbasaurPokemon).toBeTruthy();
  });

  test('updates search query', () => {
    const { getByPlaceholderText } = renderAPI;

    // Trigger text input change event
    const searchInput = getByPlaceholderText('Search Pokemon...');
    fireEvent.changeText(searchInput, 'char');

    // Check if the search input value updates
    expect(searchInput.props.value).toBe('char');
  });

  test('filters pokemon list based on search query', () => {
    const { getByText, queryByText } = renderAPI;

    // Trigger text input change event
    const searchInput = getByText('Search Pokemon...');
    fireEvent.changeText(searchInput, 'char');

    // Check if the Pokemon list is filtered correctly
    expect(queryByText('bulbasaur')).toBeFalsy();
    expect(getByText('charmander')).toBeTruthy();
  });
});
