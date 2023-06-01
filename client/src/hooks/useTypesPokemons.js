import axios from "axios";
import { useDispatch } from "react-redux";
import { getPokemonTypes } from "../redux/actions";
import { useEffect } from "react";

export const useTypesPokemons = () => {
  const dispatch = useDispatch();
  const endpoint = "http://localhost:3001/pokemons/types";
  useEffect(() => {
    const getTypes = async () => {
      try {
        const { data } = await axios.get(endpoint);
        if (data.length === 0) throw new Error("Types not found");
        dispatch(getPokemonTypes( data));
      } catch (error) {
        console.log(error.message);
      }
    };

    getTypes();
  }, []);
};
