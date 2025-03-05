import './Card.css';

const Card = ({ id, url, title, color, onClick }) => {
  return (
    <div
      className='card'
      style={{ backgroundColor: color }}
      onClick={() => onClick(id)}
    >
      <div className='card__img'>
        <img src={url} alt={title} />
      </div>
      <div className='card__title'>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;
