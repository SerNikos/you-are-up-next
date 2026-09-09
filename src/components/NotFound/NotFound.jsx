import "./NotFound.css";
import executioner from "../../assets/protagonists/executioner.jpg";
import Navbar from "../NavBar/Navbar";
import LoadingImage from "../LoadingImage/LoadingImage";
import SEO from "../SEO/SEO";

export default function NotFound() {
  return (
    <div>
      <SEO noindex />
      <Navbar />
      <main>
        <h1 className="not-found-test">404 - Page Not Found</h1>
      <LoadingImage
        src={executioner}
        alt="The Executioner character card"
      />
      </main>
    </div>
  );
}
