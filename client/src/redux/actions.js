import { GET_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID } from "./types";

export const getPokemons = (data) => {
  return (dispatch) => {
    return dispatch({
      type: GET_POKEMONS,
      payload: data.payload,
    });
  };
};

export const getPokemonByName = (dataByName) => {
  return (dispatch) => {
    return dispatch({
      type: GET_POKEMON_BY_NAME,
      payload: dataByName,
    });
  };
};

export const getPokemonById = (dataById) => {
  console.log(dataById)
  return (dispatch) => {
    return dispatch({
      type: GET_POKEMON_BY_ID,
      payload: dataById,
    });
  };
};
