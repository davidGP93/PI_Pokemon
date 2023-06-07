import axios from "axios";
import React from "react";
import { usePokemons } from "./usePokemons";
import { useNavigate } from "react-router-dom";

export const useCreatePokemon = () => {
  const endpoint = "http://localhost:3001/pokemons";
  const {getData} = usePokemons()
  const navigate = useNavigate();

  const postData = async (dataPokemon) => {
    try {
      const response = await axios({
        url: `${endpoint}`,
        method: "POST",
        data: dataPokemon,
      });
      navigate("/home")
      getData()
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    postData,
  };
};

export default useCreatePokemon;
