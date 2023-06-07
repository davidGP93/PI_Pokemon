import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import useCreatePokemon from "../../hooks/useCreatePokemon";
import { validation } from "./validation";
import formStyles from "./CreatePokemonForm.module.css";

const CreatePokemonForm = () => {
  const { postData } = useCreatePokemon();

  const allTypes = useSelector((state) => state.allTypes);
  const initialState = {
    name: "",
    image: "",
    life: "",
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
  };

  const [dataPokemon, setDataPokemon] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorsToArray = Object.values(errors);
    if (errorsToArray.length === 0) {
      alert("¡Pokemon creado con exito");
      postData(dataPokemon);
      setDataPokemon(initialState);
      setErrors(initialState);
    } else {
      alert("Faltan datos por completar");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "number") {
      const parsedValue = parseInt(value);
      setDataPokemon({
        ...dataPokemon,
        [name]: parsedValue,
      });
      setErrors(
        validation({
          ...dataPokemon,
          [name]: parsedValue,
        })
      );
    } else {
      setDataPokemon({
        ...dataPokemon,
        [name]: value,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...validation({
          ...dataPokemon,
          [name]: value,
        }),
      }));
    }
  };
  console.log(dataPokemon);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDataPokemon((prevState) => ({
        ...prevState,
        types: [...prevState.types, value],
      }));
    } else {
      setDataPokemon((prevState) => ({
        ...prevState,
        types: prevState.types.filter((type) => type !== value),
      }));
    }
  };

  const isFormValid = Object.values(dataPokemon).every((value) => value !== "");

  return (
    <Layout>
      <section className={formStyles.generalFormContainer}>
        <h1>Create your pokemon!</h1>
        <form
          onSubmit={handleSubmit}
          className={formStyles.formContainer}
          action=""
        >
          <label htmlFor="">Name of Pokemon: </label>
          <input
            type="text"
            name="name"
            value={dataPokemon.name}
            onChange={handleInputChange}
          />
          {errors.name && <p>{errors.name}</p>}
          <label htmlFor="">Select an image: </label>
          <input
            type="text"
            name="image"
            value={dataPokemon.image}
            onChange={handleInputChange}
          />
          {errors.image && <p>{errors.image}</p>}

          <label htmlFor="">Life: </label>
          <input
            type="number"
            name="life"
            value={dataPokemon.life}
            onChange={handleInputChange}
          />
          {errors.life && <p>{errors.life}</p>}
          <label htmlFor="">Attack: </label>
          <input
            type="number"
            name="attack"
            value={dataPokemon.attack}
            onChange={handleInputChange}
          />
          {errors.attack && <p>{errors.attack}</p>}
          <label htmlFor="">Defense: </label>
          <input
            type="number"
            name="defense"
            value={dataPokemon.defense}
            onChange={handleInputChange}
          />
          {errors.defense && <p>{errors.defense}</p>}
          <label htmlFor="">Speed: </label>
          <input
            type="number"
            name="speed"
            value={dataPokemon.speed}
            onChange={handleInputChange}
          />
          {errors.speed && <p>{errors.speed}</p>}
          <label htmlFor="">Height: </label>
          <input
            type="number"
            name="height"
            value={dataPokemon.height}
            onChange={handleInputChange}
          />
          {errors.height && <p>{errors.height}</p>}
          <label htmlFor="">Weight: </label>
          <input
            type="number"
            name="weight"
            value={dataPokemon.weight}
            onChange={handleInputChange}
          />
          {errors.weight && <p>{errors.weight}</p>}
          <div>
            <label>select the types covered by the pokemon</label>
            
            <div className={formStyles["formContainer-types"]}>
              {allTypes?.map((type) => (
                <div key={type.name}>
                  <input
                    type="checkbox"
                    name="types"
                    value={type.name}
                    checked={dataPokemon.types.includes(type.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={type.name}>{type.name}</label>
                </div>
              ))}
            </div>
            {errors.types && <p>{errors.types}</p>}
          </div>
          <button type="submit" disabled={!isFormValid}>
            Create pokemon
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default CreatePokemonForm;
