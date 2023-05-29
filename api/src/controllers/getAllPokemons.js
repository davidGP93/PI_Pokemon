const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon } = require("../db");
const { Op } = require("sequelize");

const getAllPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      try {
        const pokemonDetail = await getPokemonByName(name);
        if (pokemonDetail.length === 0)
          return res
            .status(404)
            .json({ error: `No hay pokemones con el nombre ${name}` });
        else return res.status(200).json(pokemonDetail);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    const dbPokemons = await Pokemon.findAll();
    const dbPokemonsFormatted = [];
    for (const pokemon of dbPokemons) {
      const associatedTypes = await pokemon.getTypes();
      const typeNames = associatedTypes.map((type) => type.name);
      dbPokemonsFormatted.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        types: typeNames,
      });
    }

    const { data } = await axios.get(URL);
    if (!data.results) throw new Error("Cannot find data");

    const apiPokemons = {
      detailData: await getGeneralInfoPokemon(data),
    };
    const allPokemons = [...dbPokemonsFormatted, ...apiPokemons.detailData];
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPokemonByName = async (name) => {
  const dbPokemons = await Pokemon.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}%`, // Utiliza Op.iLike para hacer una búsqueda insensible a mayúsculas y minúsculas
      },
    },
  });
  if (dbPokemons) {
    const associatedTypes = await dbPokemons.getTypes();
    const typeNames = associatedTypes.map((type) => type.name);

    const pokemonFromDB = {
      id: dbPokemons.id,
      name: dbPokemons.name,
      image: dbPokemons.image,
      types: typeNames,
    };

    return pokemonFromDB;
  }

  const apiResponse = await axios.get(`${URL}?name=${name}`);
  const apiPokemons = apiResponse.data.results;
  const filteredPokemons = apiPokemons.filter(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );

  const { data } = await axios.get(filteredPokemons[0].url);
  console.log(data);
  const pokemonFromApi = {
    id: data.id,
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
    type: data.types.map((type) => type.type.name),
  };

  return pokemonFromApi;
};

const getGeneralInfoPokemon = async (data) => {
  try {
    const detailInfo = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: info } = await axios.get(pokemon.url);
        const detailPokemon = {
          id: info.id,
          name: info.name,
          image: info.sprites.other.dream_world.front_default,
          type: info.types.map((type) => type.type.name),
        };
        return detailPokemon;
      })
    );
    return detailInfo;
  } catch (error) {
    throw new Error("Failed to fetch detailed data for the pokemon");
  }
};
module.exports = getAllPokemons;
