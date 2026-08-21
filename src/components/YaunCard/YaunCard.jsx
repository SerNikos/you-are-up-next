import "./YaunCard.css";

function YaunCard({
  img,
  name = "YAUN Character",
  description = "Not the luckiest individual",
}) {
  return (
    <div className="yaun-card">
      <img src={img} alt={name} className="imgCard" />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default YaunCard;
