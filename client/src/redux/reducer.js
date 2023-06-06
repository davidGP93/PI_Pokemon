import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_POKEMON_TYPES,
  FILTER_TYPES,
  FILTER_ORIGIN,
  ORDERED_NAME_AND_ATTACK,
  ADD_PAGE_NUMBER,
  PREV_PAGE_NUMBER,
  PAGE_NUMBER_BUTTON,
} from "./types";

const initialState = {
  allPokemons: [],
  originalPokemons: [],
  pokemonByName: null,
  pokemonById: null,
  allTypes: [],
  currentPage: 1,
  totalPages: 0,
  currentFilterTypes: 'allPokemons',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      const totalPokemons = [
        ...action.payload[0].dataBase,
        ...action.payload[0].apiData,
      ];
      const totalPages = Math.ceil(totalPokemons.length / 12);
      const cardPerPage = state.currentPage * 12;
      const initialCard = state.currentPage - 1;
      return {
        ...state,
        allPokemons: totalPokemons,
        originalPokemons: totalPokemons.slice(initialCard, cardPerPage),
        totalPages,
      };
    case ADD_PAGE_NUMBER:
      const tempCurrentPage = state.currentPage + 1;
      const tempPokemons = [...state.allPokemons];
      let tempViewPokemons = []
      if(state.currentFilterTypes !== "allPokemons"){
        tempViewPokemons = tempPokemons.filter(pokemon => pokemon.types.includes(state.currentFilterTypes))
      }else{
        tempViewPokemons = tempPokemons
      }
      const tempInitialPokemon = state.currentPage * 12; //12
      const tempLastPokemon = tempCurrentPage * 12; //24

      return {
        ...state,
        currentPage: tempCurrentPage,
        originalPokemons: tempViewPokemons.slice(
          tempInitialPokemon,
          tempLastPokemon
        ),
      };
    case PREV_PAGE_NUMBER:
      // const prevCurrentPage = state.currentPage > 1? state.currentPage - 1 : 1;
      const prevCurrentPage = state.currentPage - 1;
      const tempPokemons2 = [...state.allPokemons];
      const prevInitialPokemon = (prevCurrentPage - 1) * 12; //12
      const prevLastPokemon = prevCurrentPage * 12; //24
      return {
        ...state,
        currentPage: prevCurrentPage,
        originalPokemons: tempPokemons2.slice(
          prevInitialPokemon,
          prevLastPokemon
        ),
      };
    // case PAGE_NUMBER_BUTTON:
    //   const nowCurrentPage = action.payload
    //   console.log(nowCurrentPage)
    //   const allPokemonsCurrent = [...state.allPokemons];
    //   const initialIndex = (nowCurrentPage - 1) * 12
    //   const finalIndex = nowCurrentPage * 12

    //   return{
    //     ...state,
    //     currentPage: nowCurrentPage,
    //     originalPokemons: allPokemonsCurrent.slice(initialIndex, finalIndex),
    //     backupOriginalPokemons: allPokemonsCurrent.slice(initialIndex, finalIndex),
    //   }

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
      const allPokemonsCopy = [...state.allPokemons];
      const tempFilteredByTypes = allPokemonsCopy.filter((pokemon) =>
        pokemon.types.includes(action.payload)
      );
      const tempPageByTypes = Math.ceil(tempFilteredByTypes.length / 12);
      const tempSlice = tempFilteredByTypes.slice(0, 11);
      return {
        ...state,
        originalPokemons: tempSlice,
        currentPage: 1,
        totalPages: tempPageByTypes,
        currentFilterTypes: action.payload,
      };
    case FILTER_ORIGIN:
      const filteredStringId = [...state.originalPokemons].filter(
        (pokemon) => typeof pokemon.id === "string"
      );
      const filteredNumberId = [...state.originalPokemons].filter(
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
        originalPokemons: casesOrigin(),
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
        originalPokemons: orderedByNameOrAttack(),
      };
    default:
      return state;
  }
};

export default rootReducer;
