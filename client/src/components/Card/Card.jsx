import { useState } from 'react';
import './Card.css';

const Card = ({ card, isFaceUp, handleSelectCard, isSelected, type, isSelectable }) => {
  if (!isFaceUp) {
    return <div className="card back"></div>;
  }


  return (
    <div
      className={`card ${card?.suit} ${isSelected ? 'selected' : ''}`}
      onClick={() => handleSelectCard(card, type, isSelectable)}
    >
      <div className="rank">{card?.rank}</div>
      <div className="suit">{card?.suit}</div>
    </div>
  );
};

export default Card;
