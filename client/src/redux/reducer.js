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
  currentFilterTypes: "allTypes",
  currentFilterOrigin: "allPokemons",
  currentFilterNameAndAttack: "orderedNormal",
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
      let tempViewPokemons = [];
      if (state.currentFilterTypes !== "allTypes") {
        tempViewPokemons = tempPokemons.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
      } else if (state.currentFilterNameAndAttack !== "orderedNormal") {
        const copyFilterNameAndAttack = [...tempPokemons];
        const orderedNameAscendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
        );
        const orderedNameDecendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
        );
        const orderedAttackAscendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
        );
        const orderedAttackDescendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
        );
        let tempOrderedByNameOrAttack = [];

        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempOrderedByNameOrAttack = orderedNameAscendent;
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempOrderedByNameOrAttack = orderedNameDecendent;
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempOrderedByNameOrAttack = orderedAttackAscendent;
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempOrderedByNameOrAttack = orderedAttackDescendent;
        } else {
          tempOrderedByNameOrAttack = copyFilterNameAndAttack;
        }

        tempViewPokemons = tempOrderedByNameOrAttack;
      } else if (state.currentFilterOrigin !== "allPokemons") {
        const pokemonsIdString = tempPokemons.filter(
          (pokemon) => typeof pokemon.id === "string"
        );
        const pokemonsIdNumber = tempPokemons.filter(
          (pokemon) => typeof pokemon.id === "number"
        );
        tempViewPokemons =
          state.currentFilterOrigin === "API"
            ? pokemonsIdString
            : pokemonsIdNumber;
      } else {
        tempViewPokemons = tempPokemons;
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
      const prevCurrentPage = state.currentPage - 1;
      const tempPokemons2 = [...state.allPokemons];
      let tempPrevPokemons = [];
      if (state.currentFilterTypes !== "allTypes") {
        tempPrevPokemons = tempPokemons2.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
      } else if (state.currentFilterNameAndAttack !== "orderedNormal") {
        const copyFilterNameAndAttack = [...tempPokemons2];
        const orderedNameAscendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
        );
        const orderedNameDecendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
        );
        const orderedAttackAscendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
        );
        const orderedAttackDescendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
        );
        let tempOrderedByNameOrAttack = [];

        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempOrderedByNameOrAttack = orderedNameAscendent;
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempOrderedByNameOrAttack = orderedNameDecendent;
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempOrderedByNameOrAttack = orderedAttackAscendent;
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempOrderedByNameOrAttack = orderedAttackDescendent;
        } else {
          tempOrderedByNameOrAttack = copyFilterNameAndAttack;
        }

        tempPrevPokemons = tempOrderedByNameOrAttack;
      } else if (state.currentFilterOrigin !== "allPokemons") {
        const pokemonsIdString = tempPokemons2.filter(
          (pokemon) => typeof pokemon.id === "string"
        );
        const pokemonsIdNumber = tempPokemons2.filter(
          (pokemon) => typeof pokemon.id === "number"
        );
        tempPrevPokemons =
          state.currentFilterOrigin === "API"
            ? pokemonsIdString
            : pokemonsIdNumber;
      } else {
        tempPrevPokemons = tempPokemons2;
      }
      const prevInitialPokemon = (prevCurrentPage - 1) * 12; //12
      const prevLastPokemon = prevCurrentPage * 12; //24
      return {
        ...state,
        currentPage: prevCurrentPage,
        originalPokemons: tempPrevPokemons.slice(
          prevInitialPokemon,
          prevLastPokemon
        ),
      };
    case PAGE_NUMBER_BUTTON:
      const tempCurrentPageNumber = action.payload;
      console.log(tempCurrentPageNumber);
      const tempPokemonsNumber = [...state.allPokemons];
      let tempViewPokemonsNumber = [];
      if (state.currentFilterTypes !== "allTypes") {
        tempViewPokemonsNumber = tempPokemonsNumber.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
      } else if (state.currentFilterNameAndAttack !== "orderedNormal") {
        const copyFilterNameAndAttack = [...tempPokemonsNumber];
        const orderedNameAscendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
        );
        const orderedNameDecendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
        );
        const orderedAttackAscendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
        );
        const orderedAttackDescendent = [...copyFilterNameAndAttack].sort(
          (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
        );
        let tempOrderedByNameOrAttack = [];

        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempOrderedByNameOrAttack = orderedNameAscendent;
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempOrderedByNameOrAttack = orderedNameDecendent;
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempOrderedByNameOrAttack = orderedAttackAscendent;
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempOrderedByNameOrAttack = orderedAttackDescendent;
        } else {
          tempOrderedByNameOrAttack = copyFilterNameAndAttack;
        }

        tempViewPokemonsNumber = tempOrderedByNameOrAttack;
      } else if (state.currentFilterOrigin !== "allPokemons") {
        const pokemonsIdString = tempPokemonsNumber.filter(
          (pokemon) => typeof pokemon.id === "string"
        );
        const pokemonsIdNumber = tempPokemonsNumber.filter(
          (pokemon) => typeof pokemon.id === "number"
        );
        tempViewPokemonsNumber =
          state.currentFilterOrigin === "API"
            ? pokemonsIdString
            : pokemonsIdNumber;
      } else {
        tempViewPokemonsNumber = tempPokemonsNumber;
      }
      const initialIndex = (tempCurrentPageNumber - 1) * 12;
      const tempInitialPokemonNumber = initialIndex;
      const tempLastPokemonNumber = initialIndex + 12;

      return {
        ...state,
        currentPage: tempCurrentPageNumber,
        originalPokemons: tempViewPokemonsNumber.slice(
          tempInitialPokemonNumber,
          tempLastPokemonNumber
        ),
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
      const allPokemonsCopy = [...state.allPokemons];
      let tempFilteredByTypes = [];
      if (action.payload !== "allTypes") {
        tempFilteredByTypes = allPokemonsCopy.filter((pokemon) =>
          pokemon.types.includes(action.payload)
        );
      } else {
        tempFilteredByTypes = allPokemonsCopy;
      }
      const tempPageByTypes = Math.ceil(tempFilteredByTypes.length / 12);
      const tempSlice = tempFilteredByTypes.slice(0, 12);
      return {
        ...state,
        originalPokemons: tempSlice,
        currentPage: 1,
        totalPages: tempPageByTypes,
        currentFilterTypes: action.payload,
      };
    case FILTER_ORIGIN:
      const copyAllPokemons = [...state.allPokemons];
      const tempFilteredStringId = copyAllPokemons.filter(
        (pokemon) => typeof pokemon.id === "string"
      );
      const tempFilteredNumberId = copyAllPokemons.filter(
        (pokemon) => typeof pokemon.id === "number"
      );
      let tempFilteredByOrigin = [];

      if (action.payload === "dataBase") {
        tempFilteredByOrigin = tempFilteredStringId;
      } else if (action.payload === "apiData") {
        tempFilteredByOrigin = tempFilteredNumberId;
      } else {
        tempFilteredByOrigin = copyAllPokemons;
      }

      const tempPageByOrigin = Math.ceil(tempFilteredByOrigin.length / 12);
      const tempSliceOrigin = tempFilteredByOrigin.slice(0, 12);
      return {
        ...state,
        originalPokemons: tempSliceOrigin,
        currentPage: 1,
        totalPages: tempPageByOrigin,
        currentFilterOrigin: action.payload,
      };
    case ORDERED_NAME_AND_ATTACK:
      const copyFilterNameAndAttack = [...state.allPokemons];
      const orderedNameAscendent = [...copyFilterNameAndAttack].sort(
        (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
      );
      const orderedNameDecendent = [...copyFilterNameAndAttack].sort(
        (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
      );
      const orderedAttackAscendent = [...copyFilterNameAndAttack].sort(
        (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
      );
      const orderedAttackDescendent = [...copyFilterNameAndAttack].sort(
        (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
      );
      let tempOrderedByNameOrAttack = [];

      if (action.payload === "nameAscendent") {
        tempOrderedByNameOrAttack = orderedNameAscendent;
      } else if (action.payload === "nameDescendent") {
        tempOrderedByNameOrAttack = orderedNameDecendent;
      } else if (action.payload === "attackAscendent") {
        tempOrderedByNameOrAttack = orderedAttackAscendent;
      } else if (action.payload === "attackDescendent") {
        tempOrderedByNameOrAttack = orderedAttackDescendent;
      } else {
        tempOrderedByNameOrAttack = copyFilterNameAndAttack;
      }

      const tempPageNameOrAttack = Math.ceil(
        tempOrderedByNameOrAttack.length / 12
      );
      const tempPaginatedOrdered = tempOrderedByNameOrAttack.slice(0, 12);
      return {
        ...state,
        originalPokemons: tempPaginatedOrdered,
        currentPage: 1,
        totalPages: tempPageNameOrAttack,
        currentFilterNameAndAttack: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
