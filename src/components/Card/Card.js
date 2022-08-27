import React from "react";
import "./Card.scss";

const Card = ({ card }) => {
  const { cover } = card;
  return (
    <div className="card-list-item">
      {cover && (
        <img
          className="card-cover"
          src={cover}
          alt=""
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
    </div>
  );
};

export default Card;
