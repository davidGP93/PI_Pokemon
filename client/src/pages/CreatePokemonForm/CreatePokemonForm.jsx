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
          {errors.name && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.name}
            </h6>
          )}
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
          {errors.image && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.image}
            </h6>
          )}

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
          {errors.life && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.life}
            </h6>
          )}
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
          {errors.attack && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.attack}
            </h6>
          )}
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
          {errors.defense && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.defense}
            </h6>
          )}
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
          {errors.speed && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.speed}
            </h6>
          )}
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
          {errors.height && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.height}
            </h6>
          )}
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
          {errors.weight && (
            <h6 className={formStyles["formContainer-validationMessage"]}>
              {errors.weight}
            </h6>
          )}
          <div>
            <label className={formStyles["formContainer-typeMessage"]} >select the types covered by the pokemon</label>

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
            {errors.types && (
              <h6 className={formStyles["formContainer-validationMessage"]}>
                {errors.types}
              </h6>
            )}
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
