import React, { useEffect } from "react";
import detailStyles from "./Detail.module.css";
import Layout from "../Layout/Layout";
import { usePokemonById } from "../../hooks/usePokemonById";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const { getPokemonDetail } = usePokemonById();
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemonDetail(id);
    dispatch(getPokemonById(null))
    return () => {}
  },[id, getPokemonDetail, dispatch]);

  const pokemonById = useSelector((state) => state.pokemonById);
  
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/home");
  };
  return (
      <Layout>
      <button onClick={handleBackToHome}>Back to home</button>
      {pokemonById? (
        <section>
        <h2>Name: {pokemonById.name}</h2>
        <figure>
          <img src={pokemonById.image} alt={pokemonById.name} />
        </figure>
        <div>
          <h4>hp: {pokemonById.life}</h4>
          <h4>attack: {pokemonById.attack}</h4>
          <h4>defense: {pokemonById.defense}</h4>
          <h4>speed: {pokemonById.speed}</h4>
          <h4>height: {pokemonById.height}</h4>
          <h4>weight: {pokemonById.weight}</h4>
          <h5>
            types:{" "}
            {pokemonById.types?.length !== 0
              ? pokemonById.types.map(
                  (type, index) =>
                    `${type}${
                      index + 1 < pokemonById.types.length ? ", " : "."
                    }`
                )
              : "this pokemon haven't types associated"}
          </h5>
        </div>
      </section>
      ): (
        <p>Loading ...</p>
      )}
      
    </Layout>
  );
};

export default Detail;
