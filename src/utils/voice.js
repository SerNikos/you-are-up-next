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

// ΝΕΟ: Συνάρτηση που σπάει το μεγάλο κείμενο σε ασφαλή μικρά κομμάτια για τα κινητά
const chunkText = (text, maxLength = 150) => {
  const words = text.split(/\s+/);
  const chunks = [];
  let currentChunk = "";

  words.forEach((word) => {
    if (currentChunk.length + word.length > maxLength) {
      chunks.push(currentChunk.trim());
      currentChunk = word + " ";
    } else {
      currentChunk += word + " ";
    }
  });

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
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

  // 3. Toggle Play / Pause: Καθαρίζουμε ΟΛΗ την ουρά ομιλίας αν παίζει
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
    return false;
  }

  // 4. Επιλογή κειμένου για ανάγνωση
  const mainContent =
    document.querySelector("main") ||
    document.querySelector(".rules-container") ||
    document.body;

  if (!mainContent) return false;

  // Καθαρίζουμε το κείμενο από πολλαπλά κενά/αλλαγές γραμμής
  const rawText = mainContent.innerText.replace(/\s+/g, " ").trim();

  // 5. Σπάμε το κείμενο σε ασφαλή κομμάτια (chunks)
  const textChunks = chunkText(rawText, 150);

  // 6. Ρύθμιση Γλώσσας & Προφοράς
  const targetLang = isGreek ? "el-GR" : "en-US";
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((v) =>
    v.lang.startsWith(isGreek ? "el" : "en"),
  );

  // 7. Προσθέτουμε κάθε κομμάτι στην ουρά του browser
  textChunks.forEach((chunk) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = targetLang;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 0.95; // Ήπιος ρυθμός

    window.speechSynthesis.speak(utterance);
  });

  return true;
};

// Προ-φόρτωση φωνών του browser
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
