import React from "react";
import Card from "../../components/Card/Card";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePokemons } from "../../hooks/usePokemons";
import Layout from "../../components/Layout/Layout";
import homeStyles from "./Home.module.css";
import { getPokemonByName } from "../../redux/actions";

const Home = () => {
  usePokemons();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const dispatch = useDispatch();

  const SHOULD_RENDER_LIST = !pokemonByName;

  const handleClick = () => {
    dispatch(getPokemonByName(null));
  };

  return (
    <Layout>
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
          <button  onClick={handleClick}>
          view all pokemon
        </button>
        </div>
        
      )}
    </Layout>
  );
};

export default Home;
