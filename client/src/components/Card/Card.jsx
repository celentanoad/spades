import { useState } from 'react';
import './Card.css';

const Card = ({ card, isFaceUp, handleSelectCard, isSelected, type }) => {
  if (!isFaceUp) {
    return <div className="card back"></div>;
  }

  // const [selected, setSelected] = useState(false);

  const handleClickCard = () => {
    setSelected(!selected);
    handleSelectCard(card, type);
    // if (!selected) {
    //   setSelected(!selected);
    //   handleSelectCard(card);
    // } else {
    //   handleSelectCard(null);
    //   setSelected(!selected);
    // }
  };

  return (
    <div
      className={`card ${card?.suit?.name} ${isSelected ? 'selected' : ''}`}
      onClick={() => handleSelectCard(card, type)}
    >
      <div className="rank">{card?.rank?.name}</div>
      <div className="suit">{card?.suit?.name}</div>
    </div>
  );
};

export default Card;