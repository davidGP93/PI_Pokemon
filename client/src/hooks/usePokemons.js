import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPokemons } from "../redux/actions";

export const usePokemons = () => {
  const endpoint = "http://localhost:3001/pokemons";
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(endpoint);
        if (data.length === 0) throw new Error("Pokemons not found");
        dispatch(getPokemons({ payload: data }));
      } catch (error) {
        console.log(error.message);
      }
    };
    if (allPokemons.length === 0) getData();
  }, []);
};
