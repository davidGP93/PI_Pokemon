import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import { validation } from "./validation";
import formStyles from "./CreatePokemonForm.module.css";
import useFormHandlers from "../../hooks/useFormHandlers";

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

const CreatePokemonForm = () => {
  const {
    dataPokemon,
    errors,
    handleSubmit,
    handleInputChange,
    handleCheckboxChange,
    handleBlur,
  } = useFormHandlers(initialState, validation);

  const allTypes = useSelector((state) => state.allTypes);

  const isFormValid = Object.values(dataPokemon).every((value) => value !== "");

  return (
    <Layout>
      <section className={formStyles.generalFormContainer}>
        <h1>Create your pokemon!</h1>
        <form onSubmit={handleSubmit} className={formStyles.formContainer}>
          <label htmlFor="">Name of Pokemon: </label>
          <input
            type="text"
            name="name"
            placeholder="Escribe el nombre del Pokemon"
            value={dataPokemon.name}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.name && <p>{errors.name}</p>}
          <label htmlFor="">Select an image: </label>
          <input
            type="text"
            name="image"
            placeholder="Ingresa una URL de imagen valida"
            value={dataPokemon.image}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.image && <p>{errors.image}</p>}

          <label htmlFor="">Life: </label>
          <input
            type="number"
            min="0"
            name="life"
            value={dataPokemon.life}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.life && <p>{errors.life}</p>}
          <label htmlFor="">Attack: </label>
          <input
            type="number"
            min="0"
            name="attack"
            value={dataPokemon.attack}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.attack && <p>{errors.attack}</p>}
          <label htmlFor="">Defense: </label>
          <input
            type="number"
            min="0"
            name="defense"
            value={dataPokemon.defense}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.defense && <p>{errors.defense}</p>}
          <label htmlFor="">Speed: </label>
          <input
            type="number"
            min="0"
            name="speed"
            value={dataPokemon.speed}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.speed && <p>{errors.speed}</p>}
          <label htmlFor="">Height: </label>
          <input
            type="number"
            min="0"
            name="height"
            value={dataPokemon.height}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.height && <p>{errors.height}</p>}
          <label htmlFor="">Weight: </label>
          <input
            type="number"
            min="0"
            name="weight"
            value={dataPokemon.weight}
            required
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.weight && <p>{errors.weight}</p>}
          <div>
            <label>select the types covered by the pokemon</label>

            <div className={formStyles["formContainer-types"]}>
              {allTypes?.map((type) => (
                <div key={type.id}>
                  <input
                    type="checkbox"
                    name="types"
                    value={type.name}
                    onBlur={handleBlur}
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
