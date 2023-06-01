import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_POKEMON_TYPES,
  FILTER_TYPES,
} from "./types";

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
  return (dispatch) => {
    return dispatch({
      type: GET_POKEMON_BY_ID,
      payload: dataById,
    });
  };
};

export const getPokemonTypes = (types) => {
  return (dispatch) => {
    return dispatch({
      type: GET_POKEMON_TYPES,
      payload: types,
    });
  };
};

export const filterTypes = (type) => {
  console.log(type)
  return (dispatch) => {
    return dispatch({
      type: FILTER_TYPES,
      payload: type,
    });
  };
};
