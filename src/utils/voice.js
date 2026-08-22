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

// ΝΕΟ: Έξυπνος τεμαχισμός που σέβεται τις προτάσεις (τελείες, ερωτηματικά)
const chunkText = (text, maxLength = 180) => {
  const words = text.split(/\s+/);
  const chunks = [];
  let currentChunk = "";

  words.forEach((word) => {
    // Αν προσθέσουμε τη λέξη και περάσει το όριο, κλείνουμε το chunk
    if (currentChunk.length + word.length > maxLength) {
      chunks.push(currentChunk.trim());
      currentChunk = word + " ";
    } else {
      currentChunk += word + " ";
      // Έξυπνο κόψιμο: Αν η λέξη τελειώνει σε τελεία, θαυμαστικό ή ερωτηματικό
      // και το chunk είναι ήδη πάνω από 80 χαρακτήρες, το κλείνουμε εδώ για φυσική παύση!
      if (/[.!?]$/.test(word) && currentChunk.length > 80) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
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

  // --- ΒΕΛΤΙΩΜΕΝΗ ΛΟΓΙΚΗ ΓΙΑ ΠΑΥΣΕΙΣ ---
  // 1. Μετατρέπουμε μόνο τις ΔΙΠΛΕΣ αλλαγές γραμμής (Τίτλος -> Κείμενο) σε παύσεις με αποσιωπητικά
  let rawText = mainContent.innerText.replace(/\n{2,}/g, " ... ");

  // 2. Μετατρέπουμε τις μονές αλλαγές γραμμής (τυχαία κοψίματα λέξεων) σε απλό κενό
  rawText = rawText.replace(/\n/g, " ");

  // 3. Καθαρίζουμε το κείμενο από πολλαπλά κενά
  rawText = rawText.replace(/\s+/g, " ").trim();

  // 5. Σπάμε το κείμενο σε ασφαλή κομμάτια (chunks) με μέγιστο μέγεθος 180
  const textChunks = chunkText(rawText, 180);

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
