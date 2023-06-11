const regexName = new RegExp("^[a-zA-Z]{1,12}$");
const regexUrl = new RegExp(
  "(http|https|ftp|ftps)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?"
);
const regexImg = new RegExp(".*(png|jpg|jpeg|gif)$");

export const validation = (dataPokemon) => {
  let errors = {};
  if (!regexName.test(dataPokemon.name) || !dataPokemon.name) {
    errors.name = "Debe contener maximo 12 caractes";
  } else if (
    !regexUrl.test(dataPokemon.image) ||
    !regexImg.test(dataPokemon.image) ||
    !dataPokemon.image
  ) {
    errors.image =
      "Debe ser una direccion URL valida que contenga un formato de imagen valido";
  } else if (
    dataPokemon.life > 150 ||
    dataPokemon.life < 5 ||
    !dataPokemon.life
  ) {
    errors.life =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  } else if (
    dataPokemon.attack > 150 ||
    dataPokemon.attack < 5 ||
    !dataPokemon.attack
  ) {
    errors.attack =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  } else if (
    dataPokemon.defense > 150 ||
    dataPokemon.defense < 5 ||
    !dataPokemon.defense
  ) {
    errors.defense =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  } else if (
    dataPokemon.speed > 150 ||
    dataPokemon.speed < 5 ||
    !dataPokemon.speed
  ) {
    errors.speed =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  } else if (
    dataPokemon.height > 150 ||
    dataPokemon.height < 5 ||
    !dataPokemon.height
  ) {
    errors.height =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  } else if (
    dataPokemon.weight > 150 ||
    dataPokemon.weight < 5 ||
    !dataPokemon.weight
  ) {
    errors.weight =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  } else if (dataPokemon.types.length < 1) {
    errors.types = "Debe tener al menos un type";
  }

  return errors;
};
