import './Card.css'

const Card = ({url, title, color}) => {

  return (
    <div className="card" style={{backgroundColor: color}}>
      <div className="card__img"><img src={url} alt={title} /></div>
      <div className="card__title"><p>{title}</p></div>
    </div>
  )
}

export default Card