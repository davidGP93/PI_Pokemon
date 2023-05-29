import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { getPokemons } from "../redux/actions";

export const usePokemons = () => {
  const endpoint = "http://localhost:3001/pokemons";
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(endpoint);
        if (data.detailData.length === 0) throw new Error("Pokemons not found");
        console.log(data.detailData);
        dispatch(getPokemons({payload: data.detailData}));
      } catch (error) {
        console.log(error)
      }
    };
    getData();
  }, [])
}
