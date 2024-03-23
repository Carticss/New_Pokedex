interface Attack {
  name: string;
  power: number;
  accuracy: number;
}

interface Ability {
  name: string;
  description: string;
}

interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Sprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
    };
    'official-artwork': {
      front_default: string | null;
    };
    showdown: {
      front_default: string | null;
      front_female: string | null;
    };
  };
  versions: {
    [generation: string]: {
      front_default: string | null;
      front_female: string | null;
    };
  };
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  abilities: Ability[];
  baseExperience: number;
  hp: number;
  defense: number;
  speed: number;
  moves: Move[];
  description: string;
  sprites: Sprite;
  stats: Stat[];
}

export type { Attack, Ability, Move, Type, Pokemon, Sprite, Stat };
