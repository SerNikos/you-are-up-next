import english from "../src/locales/en.json" with { type: "json" };
import greek from "../src/locales/el.json" with { type: "json" };

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "can", "do", "does",
  "for", "from", "how", "i", "in", "into", "is", "it", "me", "my", "of",
  "on", "or", "our", "the", "there", "this", "to", "what", "when", "where",
  "which", "who", "why", "with", "you", "your",
  "α", "απο", "αυτο", "για", "δεν", "ειναι", "η", "θα", "και", "με",
  "μου", "να", "ο", "οι", "οταν", "οτι", "σε", "στο", "στη", "τα", "τι",
  "το", "τον", "του", "των", "πως",
]);

const GLOSSARY_LABELS = {
  md_desc: ["MD", "Main Deck"],
  bm_desc: ["BM", "Black Market"],
  pa_desc: ["PA", "Plot Armor"],
  dp_desc: ["DP", "Discard Pile"],
  remove_desc: ["RM", "Remove"],
  steal_desc: ["ST", "Steal"],
  yuan_desc: ["YU", "YOU ARE UP NEXT"],
};

const BLACK_MARKET_CARDS = [
  {
    slug: "a-gentle-push",
    title: "A Gentle Push",
    copies: 2,
    aliases: ["Απαλή Ώθηση"],
    en: "Apply YOU ARE UP NEXT to the next card in the Death Line; everyone draws 1 card.",
    el: "Εφάρμοσε το «ΕΙΣΑΙ Ο ΕΠΟΜΕΝΟΣ» στην επόμενη κάρτα της Γραμμής Θανάτου· όλοι οι παίκτες τραβούν 1 κάρτα.",
  },
  {
    slug: "resourceful",
    title: "Resourceful",
    copies: 2,
    aliases: ["Εφευρετικός"],
    en: "Draw all cards from the Board.",
    el: "Τράβηξε όλες τις κάρτες από το Ταμπλό.",
  },
  {
    slug: "break-plot-armor",
    title: "Break Plot Armor",
    copies: 1,
    aliases: ["Σπάσε την Plot Armor"],
    en: "Return a player's Plot Armor card to its pile.",
    el: "Επέστρεψε την κάρτα Plot Armor ενός παίκτη στη στοίβα της.",
  },
  {
    slug: "date-with-the-executioner",
    title: "Date with the Executioner",
    copies: 1,
    aliases: ["Ραντεβού με τον Δήμιο"],
    en: "Return the used Executioner's cards to their deck and secretly arrange them in any order.",
    el: "Επέστρεψε τις χρησιμοποιημένες κάρτες του Δήμιου στην Τράπουλα του Δήμιου και τοποθέτησέ τες κρυφά με όποια σειρά θέλεις.",
  },
  {
    slug: "fair-trade",
    title: "Fair Trade",
    copies: 1,
    aliases: ["Δίκαιη Ανταλλαγή"],
    en: "Draw 2 cards from the Main Deck, then swap your hand with a player of your choice. This counts as Stealing.",
    el: "Τράβηξε 2 κάρτες από την Κύρια Τράπουλα (MD) και μετά αντάλλαξε το χέρι σου με το χέρι ενός παίκτη της επιλογής σου. Θεωρείται Stealing.",
  },
  {
    slug: "the-gravekeeper-is-a-keeper",
    title: "The Gravekeeper Is a Keeper",
    copies: 1,
    aliases: ["Η Νεκροθάφτρια είναι Φύλακας"],
    en: "Shuffle the Discard Pile, draw its top 3 cards, and bring a dead Peasant back to life. This is distinct from The Grave Keeper card, which lets you choose 1 of the top 3.",
    el: "Ανακάτεψε τη Στοίβα Απόρριψης, τράβηξε τις 3 πάνω κάρτες της και επανάφερε στη ζωή έναν νεκρό Χωρικό. Είναι διαφορετική κάρτα από το The Grave Keeper, που σου επιτρέπει να επιλέξεις 1 από τις 3 πάνω κάρτες.",
  },
  {
    slug: "from-the-top-heads-will-drop",
    title: "From the Top, Heads Will Drop",
    copies: 1,
    aliases: ["Από την Κορυφή, Κεφάλια θα Πέσουν"],
    en: "Reshuffle the used Executioner's cards back into the Executioner's Deck, then draw 2 cards from the Main Deck.",
    el: "Ανακάτεψε ξανά τις χρησιμοποιημένες κάρτες του Δήμιου στην Τράπουλα του Δήμιου και μετά τράβηξε 2 κάρτες από την Κύρια Τράπουλα (MD).",
  },
  {
    slug: "infection",
    title: "Infection",
    copies: 1,
    aliases: ["Μόλυνση"],
    en: "Remove as many available Plot Armor cards from the game as there are players, then draw 1 card from the Main Deck.",
    el: "Αφαίρεσε από το παιχνίδι τόσες διαθέσιμες κάρτες Plot Armor όσοι είναι οι παίκτες και μετά τράβηξε 1 κάρτα από την Κύρια Τράπουλα (MD).",
  },
  {
    slug: "the-impostor-est",
    title: "The Impostor-est",
    copies: 1,
    aliases: ["Ο Μεγαλύτερος Απατεώνας"],
    en: "This card cannot be played. If it is stolen, the thief gives their entire hand to the victim.",
    el: "Αυτή η κάρτα δεν μπορεί να παιχτεί. Αν κλαπεί, ο κλέφτης δίνει ολόκληρο το χέρι του στο θύμα.",
  },
  {
    slug: "the-others-will-hate-you",
    title: "The Others Will Hate You",
    copies: 1,
    aliases: ["Οι Άλλοι θα σε Μισήσουν"],
    en: "Take any available Plot Armor card.",
    el: "Πάρε οποιαδήποτε διαθέσιμη κάρτα Plot Armor.",
  },
  {
    slug: "re-reflection",
    title: "Re-Reflection",
    copies: 2,
    aliases: ["Αντεστραμμένη Αντανάκλαση"],
    en: "Play it only outside your own Action Phase, in response to another player's Action or Black Market card. It cancels that card's effect and puts the interrupted card into your hand instead of the Discard Pile. If the cancelled card requires a discard, carry out that discard as normal; only its effect is cancelled. Re-Reflection cannot be used on Impostor or The Impostor-est because those cards are not formally played. If a Re-Reflection is used in response to another Re-Reflection, the second cancels the first and its player takes the first Re-Reflection into their hand; the original Action or Black Market card resolves normally because its cancellation was cancelled.",
    el: "Παίξε την μόνο εκτός της δικής σου Φάσης Δράσης, ως απάντηση σε κάρτα Action ή Μαύρης Αγοράς άλλου παίκτη. Ακυρώνει την επίδραση αυτής της κάρτας και παίρνεις την κάρτα που διακόπηκε στο χέρι σου αντί για τη Στοίβα Απόρριψης. Αν η ακυρωμένη κάρτα απαιτεί απόρριψη κάρτας, αυτή απορρίπτεται κανονικά· ακυρώνεται μόνο η επίδρασή της. Δεν μπορείς να χρησιμοποιήσεις Re-Reflection εναντίον των Impostor ή The Impostor-est, επειδή αυτές οι κάρτες δεν παίζονται επίσημα. Αν παίξεις Re-Reflection ως απάντηση σε άλλη Re-Reflection, η δεύτερη ακυρώνει την πρώτη και παίρνεις την πρώτη Re-Reflection στο χέρι σου· η αρχική κάρτα Action ή Μαύρης Αγοράς επιλύεται κανονικά, επειδή ακυρώθηκε η ακύρωσή της.",
  },
];

const EXECUTIONER_CARDS = [
  {
    slug: "last-meal",
    title: "Last Meal?",
    copies: 2,
    aliases: ["Last Meal", "Τελευταίο Γεύμα"],
    en: "Refill the Board. Then all players draw 1 card from the Main Deck in the order dictated by the Death Line.",
    el: "Αναπλήρωσε το Ταμπλό. Έπειτα, όλοι οι παίκτες τραβούν 1 κάρτα από την Κύρια Τράπουλα (MD), με τη σειρά που ορίζει η Γραμμή Θανάτου.",
  },
  {
    slug: "paid-guard",
    title: "Paid Guard",
    copies: 1,
    aliases: ["Πληρωμένος Φρουρός"],
    en: "Refill the Board.",
    el: "Αναπλήρωσε το Ταμπλό.",
  },
  {
    slug: "you-are-up-next",
    title: "YOU ARE UP NEXT",
    copies: 2,
    aliases: ["ΕΙΣΑΙ Ο ΕΠΟΜΕΝΟΣ"],
    en: "Execute the next card in the Death Line. Do not refill the Board.",
    el: "Εκτέλεσε την επόμενη κάρτα στη Γραμμή Θανάτου. Μην αναπληρώσεις το Ταμπλό.",
  },
];

const ACTION_CARDS = [
  {
    slug: "eat-yo-spinach",
    title: "Eat Yo Spinach",
    copies: 2,
    aliases: ["Eat Yo Spinache", "Φάε Σπανάκι"],
    en: "Counts as any Resource card. Alternatively, discard 2 Eat Yo Spinach cards to claim an available Strength Plot Armor card.",
    el: "Μετράει ως οποιαδήποτε κάρτα Πόρου. Εναλλακτικά, πέταξε 2 κάρτες Eat Yo Spinach για να πάρεις μία διαθέσιμη κάρτα Strength Plot Armor.",
  },
  {
    slug: "switch",
    title: "Switch",
    copies: 2,
    aliases: ["Αλλαγή Θέσης"],
    en: "Swap Death Line positions with the player directly in front of or behind you. Players cannot switch places with Peasants.",
    el: "Αντάλλαξε τη θέση σου στη Γραμμή Θανάτου με τον παίκτη ακριβώς μπροστά ή πίσω σου. Οι παίκτες δεν μπορούν να αλλάξουν θέση με Χωρικούς.",
  },
  {
    slug: "unlucky-thief",
    title: "Unlucky Thief",
    copies: 2,
    aliases: ["Άτυχος Κλέφτης"],
    en: "The two Unlucky Thief cards have different effects: one says discard 1 card, then steal 2 cards from another player's hand; the other says draw 2 cards from the Main Deck.",
    el: "Οι δύο κάρτες Unlucky Thief έχουν διαφορετικές επιδράσεις: η μία λέει να πετάξεις 1 κάρτα και μετά να κλέψεις 2 κάρτες από το χέρι άλλου παίκτη· η άλλη λέει να τραβήξεις 2 κάρτες από την Κύρια Τράπουλα (MD).",
  },
  {
    slug: "the-gravekeeper",
    title: "The Gravekeeper",
    copies: 3,
    aliases: ["Η Νεκροθάφτρια", "Grave Keeper"],
    en: "Shuffle the Discard Pile itself, look at its top 3 cards, and choose and draw 1. Do not shuffle it into the Main Deck. You cannot choose another The Gravekeeper or The Gravekeeper Is a Keeper card.",
    el: "Ανακάτεψε την ίδια τη Στοίβα Απόρριψης, δες τις 3 πάνω κάρτες της και διάλεξε 1 για να τραβήξεις. Μην ανακατέψεις τη Στοίβα Απόρριψης στην Κύρια Τράπουλα (MD). Δεν μπορείς να επιλέξεις άλλη κάρτα The Gravekeeper ή The Gravekeeper Is a Keeper.",
  },
  {
    slug: "unfair-trade",
    title: "Unfair Trade",
    copies: 3,
    aliases: ["Άδικη Ανταλλαγή"],
    en: "Draw 2 cards from the Main Deck.",
    el: "Τράβηξε 2 κάρτες από την Κύρια Τράπουλα (MD).",
  },
  {
    slug: "impostor",
    title: "Impostor",
    copies: 1,
    aliases: ["Απατεώνας"],
    en: "This card cannot be played. If it is stolen, the thief discards 3 cards.",
    el: "Αυτή η κάρτα δεν μπορεί να παιχτεί. Αν κλαπεί, ο κλέφτης πετάει 3 κάρτες.",
  },
  {
    slug: "steal",
    title: "Steal",
    copies: 1,
    aliases: ["Κλέψε"],
    en: "Choose another player and take 1 random face-down card from their hand. You cannot see its face or choose its identity.",
    el: "Διάλεξε έναν άλλο παίκτη και πάρε τυχαία 1 κλειστή κάρτα από το χέρι του. Δεν μπορείς να δεις την όψη της ή να επιλέξεις συγκεκριμένη κάρτα.",
  },
];

const RULES_BY_LANGUAGE = {
  en: buildRuleEntries(english, "en"),
  el: buildRuleEntries(greek, "el"),
};

function normalizeWords(value) {
  return (
    value
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLocaleLowerCase()
      .match(/[\p{L}\p{N}]+/gu) ?? []
  );
}

function cleanMarkup(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function buildRuleEntries(locale, language) {
  const entries = [];

  function visit(value, path) {
    if (typeof value === "string") {
      const text = cleanMarkup(value).replace(/\s+/g, " ").trim();
      if (!text) return;

      const glossaryKey = path.startsWith("glossary.")
        ? path.slice("glossary.".length)
        : "";
      const glossaryLabel = GLOSSARY_LABELS[glossaryKey];
      const searchText = glossaryLabel
        ? `${glossaryLabel[0]} ${glossaryLabel[1]} ${text}`
        : text;

      entries.push({
        path,
        text: glossaryLabel
          ? `${glossaryLabel[0]} (${glossaryLabel[1]}): ${text}`
          : text,
        contentWords: new Set(normalizeWords(searchText)),
        pathWords: new Set(normalizeWords(path)),
      });
      return;
    }

    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      visit(child, path ? `${path}.${key}` : key);
    }
  }

  visit(locale.rules, "rules");
  visit(locale.glossary, "glossary");

  for (const [collection, cards] of [
    ["blackMarket", BLACK_MARKET_CARDS],
    ["executionerDeck", EXECUTIONER_CARDS],
    ["actionCards", ACTION_CARDS],
  ]) {
    for (const card of cards) {
      const copyCount =
        language === "el"
          ? `${card.copies} ${card.copies === 1 ? "αντίτυπο" : "αντίτυπα"}`
          : `${card.copies} ${card.copies === 1 ? "copy" : "copies"}`;
      const path = `${collection}.${card.slug}`;

      entries.push({
        path,
        text: `${card.title} (${copyCount}): ${card[language]}`,
        contentWords: new Set(
          normalizeWords(
            `${card.title} ${card.aliases.join(" ")} ${card.en} ${card.el}`,
          ),
        ),
        pathWords: new Set(normalizeWords(path)),
      });
    }
  }

  const documentFrequency = new Map();
  for (const entry of entries) {
    for (const word of new Set([...entry.contentWords, ...entry.pathWords])) {
      documentFrequency.set(word, (documentFrequency.get(word) ?? 0) + 1);
    }
  }

  return { entries, documentFrequency };
}

function getMatchWeight(queryWord, entry) {
  if (entry.contentWords.has(queryWord)) return 3;
  if (entry.pathWords.has(queryWord)) return 2;

  if (queryWord.length < 4) return 0;
  for (const word of entry.contentWords) {
    if (
      word.length >= 4 &&
      (word.startsWith(queryWord) || queryWord.startsWith(word))
    ) {
      return 1.5;
    }
  }
  for (const word of entry.pathWords) {
    if (
      word.length >= 4 &&
      (word.startsWith(queryWord) || queryWord.startsWith(word))
    ) {
      return 1;
    }
  }
  return 0;
}

function includesPhrase(queryWords, phrase) {
  const phraseWords = normalizeWords(phrase);
  if (phraseWords.length === 0 || phraseWords.length > queryWords.length) {
    return false;
  }

  return queryWords.some((_, startIndex) =>
    phraseWords.every(
      (word, wordIndex) => queryWords[startIndex + wordIndex] === word,
    ),
  );
}

export function getRelevantRulesContext(query, language) {
  const rules = RULES_BY_LANGUAGE[language] ?? RULES_BY_LANGUAGE.en;
  const normalizedQueryWords = normalizeWords(query);
  const queryWords = [
    ...new Set(
      normalizedQueryWords.filter(
        (word) => !STOP_WORDS.has(word) && (word.length > 1 || /^\d+$/.test(word)),
      ),
    ),
  ];
  if (queryWords.length === 0) return "";

  const namedCards = [
    ...BLACK_MARKET_CARDS.map((card) => ({
      collection: "blackMarket",
      card,
    })),
    ...EXECUTIONER_CARDS.map((card) => ({
      collection: "executionerDeck",
      card,
    })),
    ...ACTION_CARDS.map((card) => ({ collection: "actionCards", card })),
  ].filter(({ card }) =>
    [card.title, ...card.aliases].some((name) =>
      includesPhrase(normalizedQueryWords, name),
    ),
  );

  if (namedCards.length > 0) {
    return namedCards
      .map(({ collection, card }) => {
        const entry = rules.entries.find(
          (candidate) =>
            candidate.path === `${collection}.${card.slug}`,
        );
        return entry ? `- ${entry.path}: ${entry.text}` : "";
      })
      .filter(Boolean)
      .join("\n");
  }

  const allCardsRequested =
    queryWords.some((word) =>
      [
        "all", "every", "each", "oles", "ola", "oloi", "kathe",
        "ολες", "ολα", "ολοι", "καθε",
      ].includes(word),
    );
  const asksForBlackMarket =
    queryWords.some((word) =>
      ["black", "market", "bm", "αγορα", "αγορας"].includes(word),
    ) &&
    queryWords.some((word) =>
      ["card", "cards", "kartes", "karta", "καρτες", "καρτα"].includes(word),
    );
  const asksForActionCards =
    queryWords.some((word) =>
      ["action", "actions", "δραση", "δρασης", "δρασεις"].includes(word),
    ) &&
    queryWords.some((word) =>
      ["card", "cards", "kartes", "karta", "καρτες", "καρτα"].includes(word),
    );
  const asksForExecutionerCards =
    queryWords.some((word) =>
      ["executioner", "executioners", "dimiou", "δημιου", "δημιος"].includes(word),
    ) &&
    queryWords.some((word) =>
      ["card", "cards", "kartes", "karta", "καρτες", "καρτα"].includes(word),
    );

  if (allCardsRequested && asksForBlackMarket) {
    const cardEntries = rules.entries.filter((entry) =>
      entry.path.startsWith("blackMarket."),
    );
    const overview =
      language === "el"
        ? "Η τράπουλα Μαύρης Αγοράς έχει 14 κάρτες: 2 αντίτυπα από τις A Gentle Push, Re-Reflection και Resourceful, και 1 αντίτυπο από καθεμία από τις υπόλοιπες κάρτες."
        : "The Black Market deck has 14 cards: 2 copies each of A Gentle Push, Re-Reflection, and Resourceful, and 1 copy of every other card.";
    return [
      `- blackMarket.deck: ${overview}`,
      ...cardEntries.map((entry) => `- ${entry.path}: ${entry.text}`),
    ].join("\n");
  }
  if (allCardsRequested && asksForActionCards) {
    const cardEntries = rules.entries.filter((entry) =>
      entry.path.startsWith("actionCards."),
    );
    const overview =
      language === "el"
        ? "Η τράπουλα Δράσης έχει 14 κάρτες: 2 Eat Yo Spinach, 2 Switch, 2 Unlucky Thief, 3 The Gravekeeper, 3 Unfair Trade, 1 Impostor και 1 Steal."
        : "The Action deck has 14 cards: 2 Eat Yo Spinach, 2 Switch, 2 Unlucky Thief, 3 The Gravekeeper, 3 Unfair Trade, 1 Impostor, and 1 Steal.";
    return [
      `- actionCards.deck: ${overview}`,
      ...cardEntries.map((entry) => `- ${entry.path}: ${entry.text}`),
    ].join("\n");
  }
  if (asksForExecutionerCards) {
    const cardEntries = rules.entries.filter((entry) =>
      entry.path.startsWith("executionerDeck."),
    );
    const overview =
      language === "el"
        ? "Η Τράπουλα του Δήμιου έχει 5 κάρτες: 2 Last Meal?, 1 Paid Guard και 2 YOU ARE UP NEXT."
        : "The Executioner's Deck has 5 cards: 2 Last Meal?, 1 Paid Guard, and 2 YOU ARE UP NEXT.";
    return [
      `- executionerDeck.deck: ${overview}`,
      ...cardEntries.map((entry) => `- ${entry.path}: ${entry.text}`),
    ].join("\n");
  }

  const rankedEntries = rules.entries
    .map((entry) => {
      let score = 0;
      let matchedWords = 0;

      for (const queryWord of queryWords) {
        const weight = getMatchWeight(queryWord, entry);
        if (!weight) continue;

        const frequency = rules.documentFrequency.get(queryWord) ?? 0;
        const inverseFrequency = Math.log(
          1 + (rules.entries.length + 1) / (frequency + 1),
        );
        score += weight * inverseFrequency;
        matchedWords += 1;
      }

      return { entry, score, matchedWords };
    })
    .filter((result) => result.matchedWords > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.matchedWords - left.matchedWords,
    );

  const excerpts = [];
  let totalLength = 0;
  for (const { entry } of rankedEntries) {
    if (excerpts.length >= 8 || totalLength >= 5500) break;
    const excerpt = `${entry.path}: ${entry.text}`;
    const remainingLength = 5500 - totalLength;
    const boundedExcerpt = excerpt.slice(0, remainingLength);
    excerpts.push(`- ${boundedExcerpt}`);
    totalLength += boundedExcerpt.length;
  }

  return excerpts.join("\n");
}
