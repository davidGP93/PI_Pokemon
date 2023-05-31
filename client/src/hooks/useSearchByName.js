import axios from "axios";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../redux/actions";

export const useSearchByName = () => {
  const dispatch = useDispatch();

  const getDataByName = async (name) => {
    try {
      const endpoint = `http://localhost:3001/pokemons/?name=${name}`;
      const { data } = await axios.get(endpoint);
      console.log(data)
      dispatch(getPokemonByName(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getDataByName,
  };
};
