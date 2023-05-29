import { GET_POKEMONS } from "./types";

export const getPokemons = (data) => {
  console.log(data);
  return (dispatch) => {
    return dispatch({
      type: GET_POKEMONS,
      payload: data.payload,
    });
  };
};
