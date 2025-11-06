import "./YaunCard.css";

function YaunCard({img, name="YAUN Character", description="Not the lukiest individual"}) {
  return (
    <div className="yaun-card">
      <img src={img} className="imgCard" />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
export default YaunCard;
