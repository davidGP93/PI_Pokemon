import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_POKEMON_TYPES,
  FILTER_TYPES,
  FILTER_ORIGIN,
  ORDERED_NAME_AND_ATTACK,
  ADD_PAGE_NUMBER,
  PREV_PAGE_NUMBER,
  PAGE_NUMBER_BUTTON,
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
  return (dispatch) => {
    return dispatch({
      type: FILTER_TYPES,
      payload: type,
    });
  };
};

export const filterOrigin = (origin) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_ORIGIN,
      payload: origin,
    });
  };
};

export const orderedByNameAndAttack = (nameOrAttack) => {
  return (dispatch) => {
    return dispatch({
      type: ORDERED_NAME_AND_ATTACK,
      payload: nameOrAttack,
    });
  };
};

export const addPageNumber = () => {
  return (dispatch) => {
    return dispatch({
      type: ADD_PAGE_NUMBER,
    });
  };
};

export const prevPageNumber = () => {
  return (dispatch) => {
    return dispatch({
      type: PREV_PAGE_NUMBER,
    });
  };
};

export const pageNumberButton = (numberPage) => {
  return (dispatch) => {
    return dispatch({
      type: PAGE_NUMBER_BUTTON,
      payload: numberPage,
    });
  };
};
