import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_POKEMON_TYPES,
  FILTER_TYPES,
} from "./types";

const initialState = {
  allPokemons: [],
  originalPokemons: [],
  pokemonByName: null,
  pokemonById: null,
  allTypes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      console.log(action.payload);
      return {
        ...state,
        allPokemons: action.payload,
        originalPokemons: action.payload,
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonByName: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: action.payload,
      };
    case GET_POKEMON_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };
    case FILTER_TYPES:
      const allPokemonsCopy = [...state.originalPokemons];
      const filteredByTypes = allPokemonsCopy.filter((pokemon) =>
        pokemon.type.includes(action.payload)
      );
      return {
        ...state,
        allPokemons:
          action.payload === "allPokemons"
            ? [...state.originalPokemons]
            : filteredByTypes,
      };
    default:
      return state;
  }
};

export default rootReducer;
