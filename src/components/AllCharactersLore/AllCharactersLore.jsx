import "./AllCharactersLore.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

// images imports
import executioner from "../../assets/executioner.png";
import notferatu from "../../assets/notferatu.png";
import misero from "../../assets/misero.png";
import paprika from "../../assets/paprika.png";
import hamlet from "../../assets/hamlet.png";

// Character data array
const characters = [
  {
    id: "executioner",
    name: "The Executioner",
    image: executioner,
    description: (
      <>
        Beauty is both a blessing and a curse. That's the problem of our beloved
        executioner. Male, female, and everything in between if you wanted a
        romantic partner, you wanted him. Legend says his first conquest was the
        midwife who delivered him. Having spent his entire life as the
        embodiment of the halo effect, he grew tired. What's the point when
        everything and everyone comes so easily? So he did the only thing that
        made sense: he decided he's a fighter, not a lover. He took over the
        family business and became the new executioner. Associated with death
        itself, surely people would stop seeing him only for his looks. And with
        endless grace and sex appeal -even in this line of work- he finally
        succeeded. Now, he's not just a handsome guy.
        <span style={{ fontWeight: "bold", color: "#b91a27e9" }}>
          {" "}
          He's the sexy executioner.
        </span>
      </>
    ),
  },
  {
    id: "notferatu",
    name: "Notferatu",
    image: notferatu,
    description: `He is a ruthless and relentless vampire hunter. After his mother died when a vampire 
      cursed her blood (she suffered from sepsis), he swore to dedicate his life to becoming 
      the greatest vampire hunter in the world, so that no one else would ever go through what 
      he did. After years of training and finding the perfect equipment, he's finally ready to
      face a vampire… once he finds one. His latest trick? To dress up as a vampire so that a 
      real one might come out of hiding without fear—and then… theeeen… they mistook him for a 
      vampire and sent him to be executed. He's now waving garlic around, scrubbing off his makeup,
      and shouting that he's human hoping to save himself. Useless though, since everyone already knows
      he's human; they just wanted an excuse to get rid of him after ten long years of him driving everyone
      crazy with his vampire obsession. `,
  },
  {
    id: "misero",
    name: "Misero",
    image: misero,
    description: `
      Humor ages with man. We don't know if that's true, but that's the state of the king's once-beloved clown.
      After more than forty years of jokes, cream pies, and sarcasm, this jester stopped spreading smiles and joy.
      In a last attempt to be funny again, he decided to reinvent himself by changing his stage name from Bozo to Smiley, Harleking, Sad-Sad-Sammy, and every other terrible name imaginable—until he finally gave up and called himself Mizerio.
      Now, all he wants is to retire. But the king won't let him because, besides being useless entertainment, he also happens to be the king’s only real advisor (when you’re the clown no one pays attention to, you overhear a lot).
      Finally, he decided to go out the way he lived: with a joke.
      He made a particularly vulgar joke about the queen's behind and ended up in line for execution.
      He’s oddly happy about it, until a child gives him a clown scepter and says he's his biggest fan.
      Realizing he can still make someone laugh, Mizerio decides… it's not his time yet.  
    `,
  },
  {
    id: "paprika",
    name: "Paprika",
    image: paprika,
    description: `
      A young maid with a talent for cooking, who, despite barely being able to read, finds a spice book
      with pictures and uses it for her next pie. She leaves everyone speechless—they've just tasted the
      most gourmet medieval dish imaginable. A woman who's good at something, can read, and uses spices? 
      She must be a witch. The court sentenced her to two months of community service, but she requested 
      execution because she's in love with the executioner (she thinks she can “fix” him).
      After annoying the judge for over three hours, he gave up and sentenced her to death.
      Unfortunately, while waiting in the execution line, she suddenly remembered: if the executioner 
      kills her, she'll never see him again. So, she decides to escape and change her approach.
    `,
  },
  {
    id: "hamlet",
    name: "Hamlet",
    image: hamlet,
    description: `
      It's the Middle Ages. A pig appears out of nowhere, knocks a flowerpot off a lady's balcony, and it
      falls on the head of the local lord—killing him instantly.
      Would you call that manslaughter or murder? Whether it's a pig doesn't matter—someone must pay for 
      this tragic accident. The worst part? The pig actually is intelligent and self-aware. In fact, he's 
      a secret member and informant of an underground organization plotting against the regime. His plan 
      all along was to assassinate the nobleman so that the city would fall under the control of this
      secret order and all without breaking the law! After all, who would accuse a pig? Well, everyone 
      actually, because he forgot he's in the Middle Ages, when people do believe animals have consciousness, 
      and criminal law is still in its early stages.And so, a cunning conspirator now finds himself trying
      desperately not to become bacon.
    `,
  },
];

export default function AllCharactersLore() {
  const { hash } = useLocation();
  console.log(hash,useLocation());

  useEffect(() => {
    if (!hash) return;

    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div>
      <Navbar />

      <main className="fullDescriptions">
        {characters.map((char) => (
          <section
            key={char.id}
            id={char.id}
            aria-labelledby={`${char.id}-title`}
          >
            <img
              src={char.image}
              alt={`${char.name} image`}
              className="character-photo"
            />
            <div className="second-half">
              <h2 id={`${char.id}-title`}>{char.name}</h2>
              <p className="character-discription">{char.description}</p>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
