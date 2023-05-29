const axios = require("axios");
const { Pokemon } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";

// const getPokemonById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log(id)
//     const { data } = await axios.get(`${URL}${id}/`);
//     if (!data.id) throw new Error(`ID ${id} Not found`);

//     const types = data.types.map(type => type.type.name)
//     const pokemon = {
//       id: data.id,
//       name: data.name,
//       image: data.sprites.other.dream_world.front_default,
//       life: data.stats?.[0].base_stat,
//       attack: data.stats?.[1].base_stat,
//       defense: data.stats?.[2].base_stat,
//       speed: data.stats?.[5].base_stat,
//       height: `${data.height * 10} cm`,
//       weight: `${data.weight * 0.1} kls`,
//       types: types,
//     };
//     console.log(pokemon.types)
//     const existingPokemon = await Pokemon.findOne({
//       where:{id}
//     })
//     // console.log(existingPokemon.dataValues)
//     if (existingPokemon) {
//       const associatedTypes = await existingPokemon.getTypes();
//       const typeNames = associatedTypes.map(type => type.name);
//       pokemon.types = typeNames
//     }
// console.log(existingPokemon)

//     return res.status(200).json(pokemon);
//   } catch (error) {
//     error.message.includes("ID")
//       ? res.status(404).json({ error: error.message })
//       : res.status(500).json({ error: error.message });
//   }
// };

// const getPokemonById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { data } = await axios.get(`${URL}${id}/`);
//     let pokemon;

//     if (data.id) {
//       const types = data.types.map((type) => type.type.name); pokemon = {
//         id: data.id,
//         name: data.name,
//         image: data.sprites.other.dream_world.front_default,
//         life: data.stats?.[0].base_stat,
//         attack: data.stats?.[1].base_stat,
//         defense: data.stats?.[2].base_stat,
//         speed: data.stats?.[5].base_stat,
//         height: `${data.height * 10} cm`,
//         weight: `${data.weight * 0.1} kls`,
//         types: types,
//       };

//       return res.status(200).json(pokemon);
//     } else if(id.length > 4 && typeof id === 'string'){
//       const existingPokemon = await Pokemon.findOne({
//         where: { id: id },
//       });
//       if (existingPokemon) {
//         const associatedTypes = await existingPokemon.getTypes();
//         const typeNames = associatedTypes.map((type) => type.name);
//         pokemon = {
//           ...existingPokemon.dataValues,
//           types: typeNames,
//         };
//         return res.status(200).json(pokemon);
//       }
//     }
//     if (pokemon === null) throw new Error(`ID ${id} Not found`);
//   } catch (error) {
//     console.log(error)
//     error.message.includes("ID")
//       ? res.status(404).json({ error: error.message })
//       : res.status(500).json({ error: error.message });
//   }
// };

const getPokemonById = async (req, res) => {
  try {
    const id = req.params.id;
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
    let pokemon;
    
    if (isUUID) {
      pokemon = await getPokemonDataBaseById(id);
      if(pokemon) return res.status(200).json(pokemon)
      else throw new Error(`ID ${id} Not found`);
    } else {
      const { data } = await axios.get(`${URL}${id}/`);
      if(data.id){
        pokemon = getPokemonApiById(data)
        return res.status(200).json(pokemon)
      }else throw new Error(`ID ${id} Not found`);
    }
  } catch (error) {
    console.log(error);
    error.message.includes("ID")
      ? res.status(404).json({ error: error.message })
      : res.status(500).json({ error: error.message });
  }
};

const getPokemonApiById = (data) => {
  const types = data.types.map((type) => type.type.name);
  const pokemon = {
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

  return pokemon;
};

const getPokemonDataBaseById = async (id) => {
  const existingPokemon = await Pokemon.findOne({
    where: { id },
  });
  if (existingPokemon) {
    const associatedTypes = await existingPokemon.getTypes();
    const typeNames = associatedTypes.map((type) => type.name);
    const pokemon = {
      ...existingPokemon.dataValues,
      types: typeNames,
    };
    return pokemon;
  }
};

module.exports = getPokemonById;
