import LoadingImage from "../LoadingImage/LoadingImage";

function CardFigure({ card, deckTitle, kind }) {
  const figureClassName = [
    "deck-card-figure",
    kind === "sample" ? "deck-sample-card" : "deck-back-card",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={figureClassName}>
      <LoadingImage
        src={card.src}
        alt={card.alt || `${deckTitle}: ${card.label || "card"}`}
        className={`deck-card-image${card.flip ? " is-flipped" : ""}`}
        wrapperClassName="deck-card-loading"
      />
      {card.label && (
        <figcaption className="deck-card-caption">{card.label}</figcaption>
      )}
    </figure>
  );
}

export default function DeckShowcase({
  title,
  description,
  backCards,
  sampleCards,
  backLabel,
  sampleLabel,
}) {
  const hasBackFamily = backCards.length > 1;
  const sampleCountClass = `has-${sampleCards.length}-samples`;

  return (
    <article
      className={`deck-showcase${hasBackFamily ? " is-back-family" : ""}`}
    >
      <div className="deck-showcase-heading">
        <h3 className="rules-subtitle2">{title}</h3>
        <p className="rules-text">{description}</p>
      </div>

      <div className="deck-showcase-stage">
        <div className="deck-showcase-block deck-showcase-back">
          <span className="deck-showcase-label">{backLabel}</span>
          <div
            className={`deck-back-display${hasBackFamily ? " is-family" : ""}`}
          >
            {backCards.map((card) => (
              <CardFigure
                card={card}
                deckTitle={title}
                kind="back"
                key={card.src}
              />
            ))}
          </div>
        </div>

        <div className="deck-showcase-block deck-showcase-samples">
          <span className="deck-showcase-label">{sampleLabel}</span>
          <div className={`deck-sample-grid ${sampleCountClass}`}>
            {sampleCards.map((card) => (
              <CardFigure
                card={card}
                deckTitle={title}
                kind="sample"
                key={card.src}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
