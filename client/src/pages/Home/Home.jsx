import React from "react";
import Card from "../../components/Card/Card";
import { useSelector } from "react-redux";
import { usePokemons } from "../../hooks/usePokemons";
import Layout from "../../components/Layout/Layout";
import homeStyles from "./Home.module.css";

const Home = () => {
  usePokemons();
  const allPokemons = useSelector((state) => state.allPokemons);

  return (
    <Layout>
      <div className={homeStyles.homeContainer}>
        {allPokemons?.map((pokemon) => (
          <Card
            id={pokemon.id}
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.type}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
