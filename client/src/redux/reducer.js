import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_POKEMON_TYPES,
  FILTER_TYPES,
  FILTER_ORIGIN,
  ORDERED_NAME_AND_ATTACK,
} from "./types";

const initialState = {
  allPokemons: [],
  originalPokemons: [],
  pokemonByName: null,
  pokemonById: null,
  allTypes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: [
          ...action.payload[0].dataBase,
          ...action.payload[0].apiData,
        ],
        originalPokemons: [
          ...action.payload[0].dataBase,
          ...action.payload[0].apiData,
        ],
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonByName: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: action.payload,
      };
    case GET_POKEMON_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };
    case FILTER_TYPES:
      const allPokemonsCopy = [...state.originalPokemons];
      const filteredByTypes = allPokemonsCopy.filter((pokemon) =>
        pokemon.types.includes(action.payload)
      );
      return {
        ...state,
        allPokemons:
          action.payload === "allPokemons"
            ? [...state.originalPokemons]
            : filteredByTypes,
      };
    case FILTER_ORIGIN:
      const filteredStringId = state.originalPokemons.filter(
        (pokemon) => typeof pokemon.id === "string"
      );
      const filteredNumberId = state.originalPokemons.filter(
        (pokemon) => typeof pokemon.id === "number"
      );
      const casesOrigin = () => {
        if (action.payload === "dataBase") {
          return filteredStringId;
        } else if (action.payload === "apiData") {
          return filteredNumberId;
        } else {
          return state.originalPokemons;
        }
      };
      return {
        ...state,
        allPokemons: casesOrigin(),
        // action.payload === "dataBase" ? filteredStringId : filteredNumberId,
      };
    case ORDERED_NAME_AND_ATTACK:
      const orderedNameAscendent = [...state.originalPokemons].sort(
        (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
      );
      const orderedNameDecendent = [...state.originalPokemons].sort(
        (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
      );
      const orderedAttackAscendent = [...state.originalPokemons].sort(
        (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
      );
      const orderedAttackDescendent = [...state.originalPokemons].sort(
        (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
      );

      const orderedByNameOrAttack = () => {
        if (action.payload === "nameAscendent") {
          return orderedNameAscendent;
        } else if (action.payload === "nameDescendent") {
          return orderedNameDecendent;
        } else if (action.payload === "attackAscendent") {
          return orderedAttackAscendent;
        } else {
          return orderedAttackDescendent;
        }
      };
      return {
        ...state,
        allPokemons: orderedByNameOrAttack(),
      };
    default:
      return state;
  }
};

export default rootReducer;
