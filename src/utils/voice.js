// src/utils/voice.js

export const toggleSpeech = (i18nLanguage) => {
  if (!("speechSynthesis" in window)) {
    alert("Ο browser σας δεν υποστηρίζει φωνητική ανάγνωση.");
    return;
  }

  // Αν παίζει ήδη κάποιος ήχος, τον σταματάμε (Play / Pause toggle)
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return false; // Επιστρέφει false για να ξέρουμε ότι σταμάτησε
  }

  // Στοχεύουμε μόνο το κύριο περιεχόμενο της σελίδας (αγνοεί Navbar & Footer)
  const mainContent =
    document.querySelector("main") ||
    document.querySelector(".rules-container") ||
    document.body;
  if (!mainContent) return false;

  const textToRead = mainContent.innerText;
  const utterance = new SpeechSynthesisUtterance(textToRead);

  // Ανίχνευση γλώσσας από το i18next (π.χ. 'el' ή 'en')
  const isGreek = i18nLanguage && i18nLanguage.startsWith("el");
  const targetLang = isGreek ? "el-GR" : "en-US";

  utterance.lang = targetLang;

  // Βρίσκουμε τη σωστή φωνή από τον browser για τη συγκεκριμένη γλώσσα
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((v) =>
    v.lang.startsWith(isGreek ? "el" : "en"),
  );

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = 0.95; // Ελαφρώς πιο αργός ρυθμός για καθαρή προφορά
  window.speechSynthesis.speak(utterance);

  return true; // Επιστρέφει true για να ξέρουμε ότι άρχισε να μιλάει
};

// Φροντίζουμε να φορτώσουν οι διαθέσιμες φωνές του browser
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
