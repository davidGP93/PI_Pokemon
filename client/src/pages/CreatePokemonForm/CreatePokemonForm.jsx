import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import formStyles from "./CreatePokemonForm.module.css";
import useCreatePokemon from "../../hooks/useCreatePokemon";

const CreatePokemonForm = () => {
  const { postData } = useCreatePokemon();

  const allTypes = useSelector((state) => state.allTypes);
  const initialState = {
    name: "",
    image: null,
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
    postData(dataPokemon);
    setDataPokemon(initialState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "number") {
      setDataPokemon({
        ...dataPokemon,
        [name]: parseInt(value),
      });
    } else {
      setDataPokemon({
        ...dataPokemon,
        [name]: value,
      });
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

  return (
    <Layout>
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
        <label htmlFor="">Select an image: </label>
        <input
          type="text"
          name="image"
          value={dataPokemon.image}
          onChange={handleInputChange}
        />
        <label htmlFor="">Life: </label>
        <input
          type="number"
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
        <label htmlFor="">Speed: </label>
        <input
          type="number"
          name="speed"
          value={dataPokemon.speed}
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
        <button type="submit">Create pokemon</button>
      </form>
    </Layout>
  );
};

export default CreatePokemonForm;
