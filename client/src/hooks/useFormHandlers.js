import { useState } from "react";
import useCreatePokemon from "./useCreatePokemon";

const useFormHandlers = (initialState, validation) => {
  const [dataPokemon, setDataPokemon] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { postData } = useCreatePokemon();

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorsToArray = Object.values(errors);
    if (errorsToArray.length === 0) {
      postData(dataPokemon);
      alert("¡Pokemon creado con exito");
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
    } else if (event.target.type === "text") {
      setDataPokemon({
        ...dataPokemon,
        [name]: value,
      });
    } else {
      handleCheckboxChange(event);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setDataPokemon((prevState) => {
      if (checked) {
        if (!prevState.types.includes(value)) {
          return {
            ...prevState,
            types: [...prevState.types, value],
          };
        }
      } else {
        return {
          ...prevState,
          types: prevState.types.filter((type) => type !== value),
        };
      }
      return prevState;
    });
  };

  const handleBlur = (event) => {
    handleInputChange(event);
    handleCheckboxChange(event);
    const validationErrors = validation(dataPokemon);
    setErrors(validationErrors);
  };

  return {
    dataPokemon,
    errors,
    handleSubmit,
    handleCheckboxChange,
    handleInputChange,
    handleBlur,
  };
};

export default useFormHandlers;
