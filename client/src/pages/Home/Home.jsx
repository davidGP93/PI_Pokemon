import Card from "../../components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { usePokemons } from "../../hooks/usePokemons";
import Layout from "../../components/Layout/Layout";
import homeStyles from "./Home.module.css";
import {
  addPageNumber,
  filterOrigin,
  filterTypes,
  getPokemonByName,
  orderedByNameAndAttack,
  pageNumberButton,
  prevPageNumber,
} from "../../redux/actions";
import { useTypesPokemons } from "../../hooks/useTypesPokemons";

const Home = () => {
  usePokemons();
  useTypesPokemons();
  const allPokemons = useSelector((state) => state.originalPokemons);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const allTypes = useSelector((state) => state.allTypes);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const dispatch = useDispatch();

  const SHOULD_RENDER_LIST = !pokemonByName;

  const returnPageHandler = () => {
    dispatch(getPokemonByName(null));
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    dispatch(filterTypes(selectedType));
  };

  const handleOriginChange = (event) => {
    dispatch(filterOrigin(event.target.value));
  };

  const handleNameOrAttackChange = (event) => {
    dispatch(orderedByNameAndAttack(event.target.value));
  };

  const nextHandler = () => {
    dispatch(addPageNumber());
  };

  const prevHandler = () => {
    dispatch(prevPageNumber());
  };

  // const onSpecificPage = (pageNumber) => {
  //   console.log(pageNumber);
  //   dispatch(pageNumberButton(pageNumber));
  // };

  return (
    <Layout>
      <h1>Pagina: {currentPage}</h1>
      <button disabled={currentPage === 1} onClick={prevHandler}>Prev</button>
      {pageNumbers.length &&
        pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            // onClick={() => onSpecificPage(pageNumber)}
            className={`${
              pageNumber === currentPage ? homeStyles.buttonPageCurrently : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
      <button disabled={currentPage >= pageNumbers.length}  onClick={nextHandler}>Next</button>
      <div className={homeStyles.typesFilter}>
        <div>
          <p>Select by Type</p>
        </div>
        <select onChange={handleTypeChange}>
          <option value="allTypes">all Types</option>
          {allTypes?.map((type, index) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <div>
          <p>Origin</p>
        </div>
        <select onChange={handleOriginChange}>
          <option value="allPokemons">all pokemons</option>
          <option value="dataBase">Data Base</option>
          <option value="apiData">API</option>
        </select>
        <div>
          <p>Ordered by</p>
        </div>
        <select onChange={handleNameOrAttackChange}>
          <option value="orderedNormal">Ordered normal</option>
          <option value="nameAscendent">Name (Ascendente)</option>
          <option value="nameDescendent">Name (Descendent)</option>
          <option value="attackAscendent">Attack (Ascendent)</option>
          <option value="attackDescendent">Attack (Descendent)</option>
        </select>
      </div>
      <div className={homeStyles.homeContainer}>
        {SHOULD_RENDER_LIST ? (
          allPokemons?.map((pokemon) => (
            <Card
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))
        ) : (
          <Card
            id={pokemonByName.id}
            key={pokemonByName.id}
            name={pokemonByName.name}
            image={pokemonByName.image}
            types={pokemonByName.types}
          />
        )}
      </div>
      {pokemonByName && (
        <div className={homeStyles.allPokemon}>
          <button onClick={returnPageHandler}>view all pokemon</button>
        </div>
      )}
      <h1>Pagina: {currentPage}</h1>
      <button disabled={currentPage === 1} onClick={prevHandler}>Prev</button>
      {pageNumbers.length &&
        pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            // onClick={() => onSpecificPage(pageNumber)}
            className={`${
              pageNumber === currentPage ? homeStyles.buttonPageCurrently : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
      <button disabled={currentPage >= pageNumbers.length} onClick={nextHandler}>Next</button>
    </Layout>
  );
};

export default Home;
