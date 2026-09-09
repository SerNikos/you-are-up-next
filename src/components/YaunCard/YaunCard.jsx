import "./YaunCard.css";
import LoadingImage from "../LoadingImage/LoadingImage";

function YaunCard({
  img,
  name = "YAUN Character",
  description = "Not the luckiest individual",
}) {
  return (
    <div className="yaun-card">
      <LoadingImage src={img} alt={name} className="imgCard" />
      <h2 dangerouslySetInnerHTML={{ __html: name }} />
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

export default YaunCard;
