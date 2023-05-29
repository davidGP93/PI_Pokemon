const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/type";
const { Type } = require("../db");

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    
    if (types.length === 0) {
      const { data } = await axios.get(URL);
      const typesPokemons = {
        allTypes: data.results.map((type) =>{
        const types = {
          name: type.name
        }
      return types
      }
       ),
      };
      await Type.bulkCreate(typesPokemons.allTypes);
      res.status(200).json(typesPokemons);
    } else {
      const typeNames = types.map((type) => type.name);
      return res.status(200).json(typeNames);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTypes;
