import React from "react";
import cardStyles from './Card.module.css'

const Card = ({ id, name, image, types }) => {
  return (
    <div className={cardStyles.cardContainer}>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className={cardStyles['cardContainer-info']}>
        <p>Name: {name}</p>

        <p>
          types: {" "}
          {types?.length !== 0
            ? types.map(
                (type, index) =>
                  `${type}${index + 1 < types.length ? ", " : "."}`
              )
            : "this pokemon have not type"}
        </p>
      </div>
    </div>
  );
};

export default Card;
