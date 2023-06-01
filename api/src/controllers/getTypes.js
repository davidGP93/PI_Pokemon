const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/type";
const { Type } = require("../db");

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();

    if (types.length === 0) {
      const { data } = await axios.get(URL);
      const typesPokemons = {
        allTypes: data.results.map((type) => ({
          name: type.name,
        })),
      };
      await Type.bulkCreate(typesPokemons.allTypes);
      res.status(200).json(typesPokemons.allTypes);
    } else {
      const typeNames = types.map((type) => ({
        id: type.typeId,
        name: type.name,
      }));
      return res.status(200).json(typeNames);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTypes;
