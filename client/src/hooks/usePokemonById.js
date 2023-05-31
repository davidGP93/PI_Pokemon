import axios from "axios";
import { useDispatch } from "react-redux";
import { getPokemonById } from "../redux/actions";
import { useCallback } from "react";

export const usePokemonById = () => {
  const dispatch = useDispatch();

  const getPokemonDetail = useCallback(async (id) => {
    try {
      const endpoint = `http://localhost:3001/pokemons/${id}`;
      const { data } = await axios.get(endpoint);
      console.log(data);
      dispatch(getPokemonById(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, getPokemonById]);

  return {
    getPokemonDetail,
  }
};
