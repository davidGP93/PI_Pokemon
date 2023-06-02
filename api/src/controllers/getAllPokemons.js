const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

const getAllPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const pokemonDetail = await getPokemonByName(name);
      if (pokemonDetail.length === 0) {
        return res
          .status(404)
          .json({ error: `No hay pokemones con el nombre ${name}` });
      } else {
        return res.status(200).json(pokemonDetail);
      }
    }

    const dbPokemons = await Pokemon.findAll({
      attributes: ["id", "name", "image", "attack"],
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const apiPokemons = await getApiPokemons();
    const truncatedApiPokemons = apiPokemons.slice(0, 72);
    const allPokemons = [
      {
        dataBase: [...formatDbPokemons(dbPokemons)],
        apiData: [...truncatedApiPokemons],
      },
    ];
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPokemonByName = async (name) => {
  const dbPokemons = await Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`, // Utiliza Op.iLike para hacer una búsqueda insensible a mayúsculas y minúsculas
      },
    },
    attributes: ["id", "name", "image"],
    include: {
      model: Type,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  if (dbPokemons.length > 0) {
    return formatDbPokemons(dbPokemons);
  }

  const apiResponse = await axios.get(`${URL}?name=${name}`);
  const apiPokemons = apiResponse.data.results;
  const filteredPokemons = apiPokemons.filter(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );

  if (filteredPokemons.length > 0) {
    const { data } = await axios.get(filteredPokemons[0].url);
    const pokemonFromApi = formatApiPokemon(data);
    return pokemonFromApi;
  }
  return [];
};

const getApiPokemons = async () => {
  const { data } = await axios.get(URL);
  if (!data.results) {
    throw new Error("Cannot find data");
  }

  const detailInfo = await Promise.all(
    data.results.map(async (pokemon) => {
      const { data: info } = await axios.get(pokemon.url);
      const detailPokemon = formatApiPokemon(info);
      return detailPokemon;
    })
  );
  return detailInfo;
};

const formatApiPokemon = (data) => {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
    attack: data.stats?.[1].base_stat,
    types: data.types.map((type) => type.type.name),
  };
};

const formatDbPokemons = (dbPokemons) => {
  return dbPokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    attack: pokemon.attack,
    types: pokemon.types.map((type) => type.name),
  }));
};
module.exports = getAllPokemons;
