import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { usePokemonById } from "../../hooks/usePokemonById";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import detailStyles from "./Detail.module.css";

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
      <section className={detailStyles.generalContainer}>
        <div>
          <button className={detailStyles.backHome}>
            <Link to="/home">Back to home</Link>
          </button>
        </div>
        {pokemonById ? (
          <section className={detailStyles.detailContainer}>
            <h2>Name: {pokemonById.name}</h2>
            <article className={detailStyles["detailContainer-target"]}>
              <figure>
                <img src={pokemonById.image} alt={pokemonById.name} />
              </figure>
              <div className={detailStyles["detailContainer-target__info"]}>
                <h4>hp: {pokemonById.life}</h4>
                <h4>attack: {pokemonById.attack}</h4>
                <h4>defense: {pokemonById.defense}</h4>
                <h4>speed: {pokemonById.speed}</h4>
                <h4>height: {pokemonById.height}</h4>
                <h4>weight: {pokemonById.weight}</h4>
                <h5>types:</h5>
                <div className={detailStyles["detailsContainer-target__contTypes"]}>
                  {pokemonById.types.length !== 0 &&
                    pokemonById.types.map((type) => (
                      <p
                        className={
                          detailStyles["detailsContainer-target__types"]
                        }
                      >
                        {type}
                      </p>
                    ))}
                </div>
              </div>
            </article>
          </section>
        ) : (
          <p>Loading ...</p>
        )}
      </section>
    </Layout>
  );
};

export default Detail;
