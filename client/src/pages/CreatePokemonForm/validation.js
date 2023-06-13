const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regexUrl = new RegExp(
  "(http|https|ftp|ftps)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?"
);
const regexImg = new RegExp(".*(png|jpg|jpeg|gif)$");

export const validation = (dataPokemon) => {
  let errors = {};
  if (!dataPokemon.name) {
    errors.name = "El campo 'Name' es requerido";
  } else if (!regexName.test(dataPokemon.name.trim())) {
    errors.name = "El campo 'Name' solo acepta letras y espacios en blanco";
  }

  if (!dataPokemon.image) {
    errors.image = "El campo 'image' es requerido";
  } else if (
    !regexUrl.test(dataPokemon.image) ||
    !regexImg.test(dataPokemon.image)
  ) {
    errors.image =
      "Debe ser una direccion URL valida que contenga un formato de imagen valido";
  }

  if (!dataPokemon.life) {
    errors.life = "El campo 'Life' es requerido";
  } else if (dataPokemon.life > 150 || dataPokemon.life < 5) {
    errors.life =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  }

  if (!dataPokemon.attack) {
    errors.attack = "El campo 'attack' es requerido";
  } else if (dataPokemon.attack > 150 || dataPokemon.attack < 5) {
    errors.attack =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  }

  if (!dataPokemon.defense) {
    errors.defense = "El campo 'Defense' es requerido";
  } else if (dataPokemon.defense > 150 || dataPokemon.defense < 5) {
    errors.defense =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  }

  if (!dataPokemon.speed) {
    errors.speed = "El campo 'Speed' es requerido";
  } else if (dataPokemon.speed > 150 || dataPokemon.speed < 5) {
    errors.speed =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  }

  if (!dataPokemon.height) {
    errors.height = "El campo 'Height' es requerido";
  } else if (dataPokemon.height > 150 || dataPokemon.height < 5) {
    errors.height =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  }

  if (!dataPokemon.weight) {
    errors.weight = "El campo 'Weight' es requerido";
  } else if (dataPokemon.weight > 150 || dataPokemon.weight < 5) {
    errors.weight =
      "No debe estar vacio ni exceder las 150 unds ni ser menor a 5 unds";
  }

  if (dataPokemon.types.length < 1) {
    errors.types = "Debe tener al menos un type";
  }

  return errors;
};
