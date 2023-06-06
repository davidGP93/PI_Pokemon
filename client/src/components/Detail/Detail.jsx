import React, { useEffect } from "react";
import detailStyles from "./Detail.module.css";
import Layout from "../Layout/Layout";
import { usePokemonById } from "../../hooks/usePokemonById";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const { getPokemonDetail } = usePokemonById();
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemonDetail(id);
    dispatch(getPokemonById(null));
    return () => {};
  }, [id, getPokemonDetail, dispatch]);

  const pokemonById = useSelector((state) => state.pokemonById);

  // const navigate = useNavigate();
  // const handleBackToHome = () => {
  //   navigate("/home");
  // };
  return (
    <Layout>
      <button><Link to="/home">Back to home</Link></button>
      {pokemonById ? (
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
            <h5>types:</h5>
            {pokemonById.types.length !== 0 &&
              pokemonById.types.map((type) => <p>{type}</p>)}
          </div>
        </section>
      ) : (
        <p>Loading ...</p>
      )}
    </Layout>
  );
};

export default Detail;
