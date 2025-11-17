import "./ContactUs.css";
import Navbar from "../NavBar/Navbar";
import hamlet from "../../assets/hamlet.png";
import Footer from "../Footer/Footer.jsx";

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("THE KING SAID WE DONT ACCEPT MESSAGES RIGHT NOW!");
  };

  return (
    <div>
      <Navbar />

      <div className="contact-us-container">
        <div className="contact-us">
          <h2>Contact Us</h2>

          <form action="#" method="post">
            <div className="warning-contact-us ">
              THE KING SAID WE DONT ACCEPT MESSAGES RIGHT NOW!
            </div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" name="surname" required />

            <label htmlFor="surname">E-mail</label>
            <input type="text" id="surname" name="surname" required />

            <label htmlFor="message">Write us your message</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit" onClick={handleSubmit}>
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
