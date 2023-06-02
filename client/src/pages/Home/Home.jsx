import Card from "../../components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { usePokemons } from "../../hooks/usePokemons";
import Layout from "../../components/Layout/Layout";
import homeStyles from "./Home.module.css";
import { filterOrigin, filterTypes, getPokemonByName, orderedByNameAndAttack } from "../../redux/actions";
import { useTypesPokemons } from "../../hooks/useTypesPokemons";

const Home = () => {
  usePokemons();
  useTypesPokemons();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const allTypes = useSelector((state) => state.allTypes);

  console.log(pokemonByName);

  const dispatch = useDispatch();

  const SHOULD_RENDER_LIST = !pokemonByName;

  const handleClick = () => {
    dispatch(getPokemonByName(null));
  };

  const handleTypeChange = (event) => {
    dispatch(filterTypes(event.target.value));
  };

  const handleOriginChange = (event) => {
    dispatch(filterOrigin(event.target.value))
  }

  const handleNameOrAttackChange = (event) => {
    dispatch(orderedByNameAndAttack(event.target.value))
  }

  return (
    <Layout>
      <div className={homeStyles.typesFilter}>
        <div>
          <p>Select by Type</p>
        </div>
        <select onChange={handleTypeChange}>
          <option value="allPokemons">all Types</option>
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
        <select onChange={handleNameOrAttackChange} >
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
          <button onClick={handleClick}>view all pokemon</button>
        </div>
      )}
    </Layout>
  );
};

export default Home;
