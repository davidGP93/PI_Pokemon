const axios = require("axios");
const { Pokemon } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonById = async (req, res) => {
  try {
    const id = req.params.id;
    const isUUID =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      );
    let pokemon;

    if (isUUID) {
      pokemon = await getPokemonFromDataBase(id);
    } else {
      pokemon = await getPokemonFromApi(id);
    }
    if (pokemon) {
      res.status(200).json(pokemon);
    } else {
      throw new Error(`ID ${id} Not found`);
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("ID")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const getPokemonFromApi = async (id) => {
  try {
    const { data } = await axios.get(`${URL}${id}/`);
    if (data.id) {
      return parsePokemonData(data);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getPokemonFromDataBase = async (id) => {
  try {
    const existingPokemon = await Pokemon.findOne({
      where: { id },
      attributes:['id', 'name', 'image', 'life', 'attack', 'defense', 'speed', 'weight', 'height']
    });
    if (existingPokemon) {
      const associatedTypes = await existingPokemon.getTypes();
      const typeNames = associatedTypes.map((type) => type.name);
      return {
        ...existingPokemon.dataValues,
        types: typeNames,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const parsePokemonData = (data) => {
  const types = data.types.map((type) => type.type.name);
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
    life: data.stats?.[0].base_stat,
    attack: data.stats?.[1].base_stat,
    defense: data.stats?.[2].base_stat,
    speed: data.stats?.[5].base_stat,
    height: `${data.height * 10} cm`,
    weight: `${data.weight * 0.1} kls`,
    types: types,
  };
};

module.exports = getPokemonById;
