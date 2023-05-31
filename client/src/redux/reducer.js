import { GET_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID } from "./types";

const initialState = {
  allPokemons: [],
  pokemonByName: null,
  pokemonById: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
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
    default:
      return state;
  }
};

export default rootReducer;
