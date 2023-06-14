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

  const onSpecificPage = (pageNumber) => {
    dispatch(pageNumberButton(pageNumber));
  };

  return (
    <Layout>
      <div className={homeStyles["homeContainer-filters"]}>
        <section className={homeStyles["homeContainer-filtersPager"]}>
          <h1>Page: {currentPage}</h1>
          <button
            className={homeStyles["homeContainer-filtersPager__sequenceButton"]}
            disabled={currentPage === 1}
            onClick={prevHandler}
          >
            Previous
          </button>
          {pageNumbers.length &&
            pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => onSpecificPage(pageNumber)}
                className={`${
                  homeStyles["homeContainer-filtersPager__buttonPager"]
                } ${
                  pageNumber === currentPage
                    ? homeStyles["homeContainer-filtersPager__buttonPageActive"]
                    : ""
                }`}
              >
                {pageNumber}
              </button>
            ))}
          <button
            className={homeStyles["homeContainer-filtersPager__sequenceButton"]}
            disabled={currentPage >= pageNumbers.length}
            onClick={nextHandler}
          >
            Next
          </button>
        </section>
        <section className={homeStyles["homeContainer-filterTypes"]}>
          <div className={homeStyles["homeContainer-filterTypes__types"]}>
            <h3>Select by type</h3>
            <select onChange={handleTypeChange}>
              <option value="allTypes">All Types</option>
              {allTypes?.map((type, index) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className={homeStyles["homeContainer-filterTypes__types"]}>
            <h3>Origin</h3>
            <select onChange={handleOriginChange}>
              <option value="allPokemons">All pokemons</option>
              <option value="dataBase">Data Base</option>
              <option value="apiData">API</option>
            </select>
          </div>
          <div className={homeStyles["homeContainer-filterTypes__types"]}>
            <h3>Ordered by</h3>
            <select onChange={handleNameOrAttackChange}>
              <option value="orderedNormal">Ordered normal</option>
              <option value="nameAscendent">Name (Ascendente)</option>
              <option value="nameDescendent">Name (Descendent)</option>
              <option value="attackAscendent">Attack (Ascendent)</option>
              <option value="attackDescendent">Attack (Descendent)</option>
            </select>
          </div>
        </section>
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
      <section
        className={`${homeStyles["homeContainer-filters"]} ${homeStyles["homeContainer-filtersPager"]}`}
      >
        <h1>Page: {currentPage}</h1>
        <button
          className={homeStyles["homeContainer-filtersPager__sequenceButton"]}
          disabled={currentPage === 1}
          onClick={prevHandler}
        >
          Previous
        </button>
        {pageNumbers.length &&
          pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onSpecificPage(pageNumber)}
              className={`${
                homeStyles["homeContainer-filtersPager__buttonPager"]
              } ${
                pageNumber === currentPage
                  ? homeStyles["homeContainer-filtersPager__buttonPageActive"]
                  : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
        <button
          className={homeStyles["homeContainer-filtersPager__sequenceButton"]}
          disabled={currentPage >= pageNumbers.length}
          onClick={nextHandler}
        >
          Next
        </button>
      </section>
    </Layout>
  );
};

export default Home;
