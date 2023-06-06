import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import formStyles from "./CreatePokemonForm.module.css";

const CreatePokemonForm = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    console.log(event.target.value)
    // console.log(event.taget.value)
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className={formStyles.formContainer}
        action=""
      >
        <label htmlFor="">Name of Pokemon: </label>
        <input
          type="text"
          name="name"
          // value={dataPokemon.name}
          onChange={handleInputChange}
        />
        <label htmlFor="">add an image (URL): </label>
        <input
          type="text"
          name="image"
          value={dataPokemon.image}
          onChange={handleInputChange}
        />
        <label htmlFor="">Life: </label>
        <input
          type="text"
          name="life"
          value={dataPokemon.life}
          onChange={handleInputChange}
        />
        <label htmlFor="">Attack: </label>
        <input
          type="number"
          name="attack"
          value={dataPokemon.attack}
          onChange={handleInputChange}
        />
        <label htmlFor="">Defense: </label>
        <input
          type="number"
          name="defense"
          value={dataPokemon.defense}
          onChange={handleInputChange}
        />
        <label htmlFor="">Height: </label>
        <input
          type="number"
          name="height"
          value={dataPokemon.height}
          onChange={handleInputChange}
        />
        <label htmlFor="">Weight: </label>
        <input
          type="number"
          name="weight"
          value={dataPokemon.weight}
          onChange={handleInputChange}
        />
        <label htmlFor="">select the types covered by the pokemon</label>
        <div className={formStyles["formContainer-types"]}>
          {allTypes?.map((type) => (
            <div key={type.name}>
              <input type="checkbox" name="types" value={type.name} />
              <label htmlFor={type.name}>{type.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Create pokemon</button>
      </form>
    </Layout>
  );
};

export default CreatePokemonForm;
