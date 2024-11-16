import './Card.css'; // Import CSS for styling

const Card = ({ rank, suit, isFaceUp }) => {
  if (!isFaceUp) {
    return <div className="card back"></div>;
  }

  return (
    <div className={`card ${suit}`}>
      <div className="rank">{rank}</div>
      <div className="suit">{suit}</div>
    </div>
  );
};

export default Card;