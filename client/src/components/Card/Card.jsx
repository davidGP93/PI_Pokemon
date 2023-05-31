import React from "react";
import cardStyles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, types }) => {
  return (
    <div className={cardStyles.cardContainer}>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className={cardStyles["cardContainer-info"]}>
        <p>
          <Link to={`/detail/${id}`}>Name: {name}</Link>
        </p>

        <p>
          types:{" "}
          {types?.length !== 0
            ? types.map(
                (type, index) =>
                  `${type}${index + 1 < types.length ? ", " : "."}`
              )
            : "this pokemon haven't types associated"}
        </p>
      </div>
    </div>
  );
};

export default Card;
