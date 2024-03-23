import { Pokemon } from '../../../common/interfaces/HomeTypes';
import { View, StyleSheet } from 'react-native';
import { Stat } from './Stat';
import React from 'react'

export const StatsTab = ({pokemon}: {
    pokemon: Pokemon
}) => {
  const stats = pokemon.stats
  const total = stats.reduce((prev, curr) => prev + curr.base_stat, 0) || 0

  return (
    <View style={styles.container}>
      {
        stats.map(({ stat, base_stat }) => (
          <Stat
            key={stat.name}
            name={stat.name}
            baseStat={base_stat}
            percetange={150}
          />
        ))
      }
      <Stat name='Total' baseStat={total} percetange={1000} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25
  }
})