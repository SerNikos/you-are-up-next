// src/utils/voice.js

// Ανίχνευση αν ο χρήστης βρίσκεται μέσα στον In-App Browser (Instagram, Messenger, FB κλπ.)
export const isInAppBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || window.opera || "";
  return (
    ua.includes("FBAN") ||
    ua.includes("FBAV") ||
    ua.includes("Instagram") ||
    ua.includes("Messenger") ||
    ua.includes("Line")
  );
};

export const toggleSpeech = (i18nLanguage = "el") => {
  const isGreek = i18nLanguage && i18nLanguage.startsWith("el");

  // 1. Αν ο χρήστης είναι σε In-App Browser (Instagram/Messenger/FB)
  if (isInAppBrowser()) {
    alert(
      isGreek
        ? "Για να ακούσετε τη σελίδα:\n\nΠατήστε τις 3 τελείες (•••) πάνω δεξιά και επιλέξτε 'Άνοιγμα σε περιηγητή' (ή 'Open in Chrome/Safari')."
        : "To listen to this page:\n\nTap the 3 dots (•••) at the top right and select 'Open in browser' (or 'Open in Chrome/Safari').",
    );
    return false;
  }

  // 2. Έλεγχος αν ο browser υποστηρίζει το Web Speech API
  if (!("speechSynthesis" in window)) {
    alert(
      isGreek
        ? "Ο περιηγητής σας δεν υποστηρίζει φωνητική ανάγνωση. Παρακαλούμε χρησιμοποιήστε Google Chrome, Safari ή Edge."
        : "Your browser does not support text-to-speech. Please use Google Chrome, Safari, or Edge.",
    );
    return false;
  }

  // 3. Toggle Play / Pause: Αν παίζει ήδη, σταμάτησέ το
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return false;
  }

  // 4. Επιλογή κειμένου για ανάγνωση
  const mainContent =
    document.querySelector("main") ||
    document.querySelector(".rules-container") ||
    document.body;

  if (!mainContent) return false;

  const textToRead = mainContent.innerText;
  const utterance = new SpeechSynthesisUtterance(textToRead);

  // 5. Ρύθμιση Γλώσσας & Προφοράς
  const targetLang = isGreek ? "el-GR" : "en-US";
  utterance.lang = targetLang;

  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((v) =>
    v.lang.startsWith(isGreek ? "el" : "en"),
  );

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = 0.95; // Ήπιος ρυθμός για καθαρή ανάγνωση

  // Έναρξη φωνητικής ανάγνωσης
  window.speechSynthesis.speak(utterance);

  return true;
};

// Προ-φόρτωση φωνών του browser
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
