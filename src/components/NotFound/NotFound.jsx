import "./NotFound.css";
import executioner from "../../assets/executioner.png";

export default function NotFound() {
  return (
    <div>
      <h1 className="not-found-test">NOT FOUND 404 UNFORTUNATELLY</h1>
      <img src={executioner} alt="executioner image" aria-labelledby="executioner image" />
    </div>
  );
}
