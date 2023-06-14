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

        if (state.currentFilterOrigin !== "allPokemons") {
          const pokemonsIdString = tempPokemons.filter(
            (pokemon) => typeof pokemon.id === "string"
          );
          const pokemonsIdNumber = tempPokemons.filter(
            (pokemon) => typeof pokemon.id === "number"
          );
          tempViewPokemons =
            state.currentFilterOrigin === "apiData"
              ? [...pokemonsIdNumber].filter((pokemon) =>
                  pokemon.types.includes(state.currentFilterTypes)
                )
              : [...pokemonsIdString].filter((pokemon) =>
                  pokemon.types.includes(state.currentFilterTypes)
                );
        }
      }
      if (
        state.currentFilterTypes !== "allTypes" &&
        state.currentFilterNameAndAttack !== "orderedNormal"
      ) {
        let filteredByTypes = [...tempPokemons].filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempViewPokemons = [...filteredByTypes].sort((pokemonA, pokemonB) =>
            pokemonA.name.localeCompare(pokemonB.name)
          );
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempViewPokemons = [...filteredByTypes].sort((pokemonA, pokemonB) =>
            pokemonB.name.localeCompare(pokemonA.name)
          );
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempViewPokemons = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
          );
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempViewPokemons = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
          );
        } else {
          tempViewPokemons = [...filteredByTypes];
        }
      } else if (state.currentFilterNameAndAttack !== "orderedNormal") {
        const orderedNameAscendent = [...tempPokemons].sort(
          (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
        );
        const orderedNameDecendent = [...tempPokemons].sort(
          (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
        );
        const orderedAttackAscendent = [...tempPokemons].sort(
          (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
        );
        const orderedAttackDescendent = [...tempPokemons].sort(
          (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
        );

        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempViewPokemons = orderedNameAscendent;
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempViewPokemons = orderedNameDecendent;
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempViewPokemons = orderedAttackAscendent;
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempViewPokemons = orderedAttackDescendent;
        } else {
          tempViewPokemons = tempPokemons;
        }
      } else {
        tempViewPokemons = tempPokemons;
      }
      const tempInitialPokemon = state.currentPage * 12; //12
      const tempLastPokemon = tempCurrentPage * 12; //24
      const tempSliceViewPokemons = tempViewPokemons.slice(
        tempInitialPokemon,
        tempLastPokemon
      );
      console.log(tempSliceViewPokemons);
      return {
        ...state,
        currentPage: tempCurrentPage,
        originalPokemons: tempSliceViewPokemons,
      };
    case PREV_PAGE_NUMBER:
      const prevCurrentPage = state.currentPage - 1;
      const tempPokemons2 = [...state.allPokemons];
      let tempPrevPokemons = [];

      if (state.currentFilterTypes !== "allTypes") {
        tempPrevPokemons = tempPokemons2.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );

        if (state.currentFilterOrigin !== "allPokemons") {
          const pokemonsIdString = tempPokemons2.filter(
            (pokemon) => typeof pokemon.id === "string"
          );
          const pokemonsIdNumber = tempPokemons2.filter(
            (pokemon) => typeof pokemon.id === "number"
          );

          tempPrevPokemons =
            state.currentFilterOrigin === "apiData"
              ? [...pokemonsIdNumber].filter((pokemon) =>
                  pokemon.types.includes(state.currentFilterTypes)
                )
              : [...pokemonsIdString].filter((pokemon) =>
                  pokemon.types.includes(state.currentFilterTypes)
                );
        }
      }
      if (state.currentFilterTypes !== "allTypes") {
        let filteredByTypes = [...tempPokemons2].filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempPrevPokemons = [...filteredByTypes].sort((pokemonA, pokemonB) =>
            pokemonA.name.localeCompare(pokemonB.name)
          );
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempPrevPokemons = [...filteredByTypes].sort((pokemonA, pokemonB) =>
            pokemonB.name.localeCompare(pokemonA.name)
          );
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempPrevPokemons = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
          );
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempPrevPokemons = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
          );
        } else {
          tempPrevPokemons = [...filteredByTypes];
        }
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

        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempPrevPokemons = orderedNameAscendent;
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempPrevPokemons = orderedNameDecendent;
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempPrevPokemons = orderedAttackAscendent;
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempPrevPokemons = orderedAttackDescendent;
        } else {
          tempPrevPokemons = copyFilterNameAndAttack;
        }
      } else {
        tempPrevPokemons = tempPokemons2;
      }
      const prevInitialPokemon = (prevCurrentPage - 1) * 12; //12
      const prevLastPokemon = prevCurrentPage * 12; //24
      const tempSlicePrevPokemons = tempPrevPokemons.slice(
        prevInitialPokemon,
        prevLastPokemon
      );
      return {
        ...state,
        currentPage: prevCurrentPage,
        originalPokemons: tempSlicePrevPokemons,
      };
    case PAGE_NUMBER_BUTTON:
      const tempCurrentPageNumber = action.payload;
      const tempPokemonsNumber = [...state.allPokemons];
      const pokemonsIdStringPage = tempPokemonsNumber.filter(
        (pokemon) => typeof pokemon.id === "string"
      );
      const pokemonsIdNumberPage = tempPokemonsNumber.filter(
        (pokemon) => typeof pokemon.id === "number"
      );
      let tempViewPokemonsNumber = [];

      if (state.currentFilterTypes !== "allTypes") {
        tempViewPokemonsNumber = tempPokemonsNumber.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );

        if (state.currentFilterOrigin !== "allPokemons") {
          tempViewPokemonsNumber =
            state.currentFilterOrigin === "apiData"
              ? [...pokemonsIdNumberPage].filter((pokemon) =>
                  pokemon.types.includes(state.currentFilterTypes)
                )
              : [...pokemonsIdStringPage].filter((pokemon) =>
                  pokemon.types.includes(state.currentFilterTypes)
                );
        }
      }
      if (
        state.currentFilterTypes !== "allTypes" &&
        state.currentFilterNameAndAttack !== "orderedNormal"
      ) {
        let filteredByTypes = [...tempPokemonsNumber].filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempViewPokemonsNumber = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
          );
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempViewPokemonsNumber = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
          );
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempViewPokemonsNumber = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
          );
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempViewPokemonsNumber = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
          );
        } else {
          tempViewPokemonsNumber = [...filteredByTypes];
        }
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

        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempViewPokemonsNumber = orderedNameAscendent;
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempViewPokemonsNumber = orderedNameDecendent;
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempViewPokemonsNumber = orderedAttackAscendent;
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempViewPokemonsNumber = orderedAttackDescendent;
        } else {
          tempViewPokemonsNumber = copyFilterNameAndAttack;
        }
      } else {
        tempViewPokemonsNumber = tempPokemonsNumber;
      }
      const initialIndex = (tempCurrentPageNumber - 1) * 12;
      const tempInitialPokemonNumber = initialIndex;
      const tempLastPokemonNumber = initialIndex + 12;
      const tempSlicePokemonsNumber = tempViewPokemonsNumber.slice(
        tempInitialPokemonNumber,
        tempLastPokemonNumber
      );

      console.log("----------currentOrder---------------");
      console.log(state.currentFilterNameAndAttack);
      console.log("--------tempViewPokemonsNumbe------------------");
      console.log(tempViewPokemonsNumber);
      return {
        ...state,
        currentPage: tempCurrentPageNumber,
        originalPokemons: tempSlicePokemonsNumber,
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
      const pokemonsIdString = allPokemonsCopy.filter(
        (pokemon) => typeof pokemon.id === "string"
      );
      const pokemonsIdNumber = allPokemonsCopy.filter(
        (pokemon) => typeof pokemon.id === "number"
      );
      let tempFilteredByTypes = [];
      if (action.payload !== "allTypes") {
        tempFilteredByTypes = allPokemonsCopy.filter((pokemon) =>
          pokemon.types.includes(action.payload)
        );
      } else {
        tempFilteredByTypes = allPokemonsCopy;
      }

      if (state.currentFilterOrigin !== "allPokemons") {
        let filterTypesByApi = pokemonsIdNumber.filter((pokemon) =>
          pokemon.types.includes(action.payload)
        );
        let filterTypesByDataBase = pokemonsIdString.filter((pokemon) =>
          pokemon.types.includes(action.payload)
        );
        if (state.currentFilterOrigin === "apiData")
          tempFilteredByTypes = filterTypesByApi;
        else if (state.currentFilterOrigin === "dataBase")
          tempFilteredByTypes = filterTypesByDataBase;
        else tempFilteredByTypes = allPokemonsCopy;

        // tempFilteredByTypes = state.currentFilterOrigin === 'apiData'
        // ? filterTypesByApi
        // : filterTypesByDataBase;
      }
      if (
        action.payload === "allTypes" &&
        state.currentFilterOrigin === "dataBase"
      ) {
        tempFilteredByTypes = pokemonsIdString;
      }
      if (
        action.payload === "allTypes" &&
        state.currentFilterOrigin === "apiData"
      ) {
        tempFilteredByTypes = pokemonsIdNumber;
      }

      if (state.currentFilterNameAndAttack !== "orderedNormal") {
        if (state.currentFilterNameAndAttack === "nameAscendent") {
          tempFilteredByTypes = tempFilteredByTypes.sort((pokemonA, pokemonB) =>
            pokemonA.name.localeCompare(pokemonB.name)
          );
        } else if (state.currentFilterNameAndAttack === "nameDescendent") {
          tempFilteredByTypes = tempFilteredByTypes.sort((pokemonA, pokemonB) =>
            pokemonB.name.localeCompare(pokemonA.name)
          );
        } else if (state.currentFilterNameAndAttack === "attackAscendent") {
          tempFilteredByTypes = tempFilteredByTypes.sort(
            (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
          );
        } else if (state.currentFilterNameAndAttack === "attackDescendent") {
          tempFilteredByTypes = tempFilteredByTypes.sort(
            (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
          );
        }
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

      if (state.currentFilterTypes !== "allTypes") {
        let filterTypesByApi = tempFilteredNumberId.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
        let filterTypesByDataBase = tempFilteredStringId.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
        let filteredTypesByAll = copyAllPokemons.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );

        if (action.payload === "apiData")
          tempFilteredByOrigin = filterTypesByApi;
        else if (action.payload === "dataBase")
          tempFilteredByOrigin = filterTypesByDataBase;
        else tempFilteredByOrigin = filteredTypesByAll;
      }

      const tempPageByOrigin = Math.ceil(tempFilteredByOrigin.length / 12);
      const tempSliceOrigin = tempFilteredByOrigin.slice(0, 12);
      console.log(tempSliceOrigin);
      console.log("-----state.currentorigin-----");
      console.log(state.currentFilterOrigin);
      return {
        ...state,
        originalPokemons: tempSliceOrigin,
        currentPage: 1,
        totalPages: tempPageByOrigin,
        currentFilterOrigin: action.payload,
      };
    case ORDERED_NAME_AND_ATTACK:
      const copyForOrdering = [...state.allPokemons];
      const orderedNameAscendent = [...copyForOrdering].sort(
        (pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)
      );
      const orderedNameDecendent = [...copyForOrdering].sort(
        (pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name)
      );
      const orderedAttackAscendent = [...copyForOrdering].sort(
        (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
      );
      const orderedAttackDescendent = [...copyForOrdering].sort(
        (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
      );
      let tempSortedData = [];

      if (action.payload === "nameAscendent") {
        tempSortedData = orderedNameAscendent;
      } else if (action.payload === "nameDescendent") {
        tempSortedData = orderedNameDecendent;
      } else if (action.payload === "attackAscendent") {
        tempSortedData = orderedAttackAscendent;
      } else if (action.payload === "attackDescendent") {
        tempSortedData = orderedAttackDescendent;
      } else {
        tempSortedData = copyForOrdering;
      }

      if (state.currentFilterTypes !== "allTypes") {
        let filteredByTypes = copyForOrdering.filter((pokemon) =>
          pokemon.types.includes(state.currentFilterTypes)
        );
        if (action.payload === "nameAscendent") {
          tempSortedData = [...filteredByTypes].sort((pokemonA, pokemonB) =>
            pokemonA.name.localeCompare(pokemonB.name)
          );
        } else if (action.payload === "nameDescendent") {
          tempSortedData = [...filteredByTypes].sort((pokemonA, pokemonB) =>
            pokemonB.name.localeCompare(pokemonA.name)
          );
        } else if (action.payload === "attackAscendent") {
          tempSortedData = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack
          );
        } else if (action.payload === "attackDescendent") {
          tempSortedData = [...filteredByTypes].sort(
            (pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack
          );
        } else {
          tempSortedData = [...filteredByTypes];
        }
      }

      const tempPageNameOrAttack = Math.ceil(tempSortedData.length / 12);
      const tempPaginatedOrdered = tempSortedData.slice(0, 12);
      console.log(tempPaginatedOrdered);
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
