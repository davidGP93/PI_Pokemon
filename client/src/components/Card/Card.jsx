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
        <p className={cardStyles['cardContainer-info__name']}>
          Name: {name}
        </p>
          <h5>types:</h5>
        <div className={cardStyles['cardContainer-info__types']}>
          {types && types.length !== 0 ? types.map((type) => <p >{type}</p>) : 'this pokemon have not types'}
        </div>
        <button><Link to={`/detail/${id}`} className="Link">VIEW DETAILS</Link></button>
      </div>
    </div>
  );
};

export default Card;
