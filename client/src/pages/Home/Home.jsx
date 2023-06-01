import Card from "../../components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { usePokemons } from "../../hooks/usePokemons";
import Layout from "../../components/Layout/Layout";
import homeStyles from "./Home.module.css";
import { filterTypes, getPokemonByName } from "../../redux/actions";
import { useTypesPokemons } from "../../hooks/useTypesPokemons";

const Home = () => {
  usePokemons();
  useTypesPokemons();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const allTypes = useSelector((state) => state.allTypes);

  const dispatch = useDispatch();

  const SHOULD_RENDER_LIST = !pokemonByName;

  const handleClick = () => {
    dispatch(getPokemonByName(null));
  };

  const handleTypeChange = (event) => {
    console.log(event.target.value)
    dispatch(filterTypes(event.target.value));
  };

  return (
    <Layout>
      <div className={homeStyles.typesFilter}>
        <select defaultValue='selectType' onChange={handleTypeChange}>
          <option value='selectType' disabled>
            Select a type
          </option>
          <option value="allPokemons">all Pokemons</option>
          {allTypes?.map((type, index) => (
            <option key={type.id} value={type.name}>{type.name}</option>
          ))}
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
              types={pokemon.type}
            />
          ))
        ) : (
          <Card
            id={pokemonByName.id}
            key={pokemonByName.id}
            name={pokemonByName.name}
            image={pokemonByName.image}
            types={pokemonByName.type}
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
