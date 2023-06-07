const regexName = new RegExp("^[a-zA-Z]{1,12}$");
const regexUrl = new RegExp("(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?") ;
const regexImg = new RegExp(".*(png|jpg|jpeg|gif)$")


export const validation = (dataPokemon) => {
  let errors = {};
  if (!regexName.test(dataPokemon.name) || dataPokemon.name === "") {
    errors.name = "Debe contener maximo 12 caractes";
  } else if (!regexUrl.test(dataPokemon.image) || !regexImg.test(dataPokemon.image)) {
    errors.image = "Debe ser una direccion URL valida que contenga un formato de imagen valido";
  } else if (dataPokemon.life > 150 || dataPokemon.life < 5){
    errors.life = "No debe exceder las 150 unds ni ser menor a 5";
  }else if(dataPokemon.attack > 150){
    errors.attack = "No debe exceder las 150 unds ni ser menor a 5";
  }else if(dataPokemon.defense > 150){
    errors.defense = "No debe exceder las 150 unds ni ser menor a 5";
  }else if(dataPokemon.speed > 150){
    errors.speed = "No debe exceder las 150 unds ni ser menor a 5";
  }else if(dataPokemon.height > 150){
    errors.height = "No debe exceder las 150 unds ni ser menor a 5";
  }else if( dataPokemon.weight > 150){
    errors.weight = "No debe exceder las 150 unds ni ser menor a 5";
  }else if(dataPokemon.types.length === []){
    errors.types = "Debe tener al menos un type"
  }

  return errors;
};
