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
        if (data.length === 0) throw new Error("Pokemons not found");
        
        dispatch(getPokemons({payload: data}));
      } catch (error) {
        console.log(error)
      }
    };
    getData();
    return () => {}
  
  }, [])
}

