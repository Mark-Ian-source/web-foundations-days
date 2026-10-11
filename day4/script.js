
const noteText = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const DRAFT_KEY = "quicknotes-day4-draft";
const THEME_KEY = "quicknotes-day4-theme";
const MAX_CHARS = 200;

// Update the character and word counters
function updateCounters() {
  const text = noteText.value;
  const characters = text.length;

  // Count words, ignoring extra spaces and line breaks
  const trimmedText = text.trim();
  const words = trimmedText === ""
    ? 0
    : trimmedText.split(/\s+/).length;

  charCount.textContent =
    `${characters} / ${MAX_CHARS} characters`;

  wordCount.textContent = `${words} words`;

  // Reset old warning styles
  charCount.classList.remove("warning", "over");

  if (characters > MAX_CHARS) {
    charCount.classList.add("over");
  } else if (characters > 180) {
    charCount.classList.add("warning");
  }

  // Save the current draft
  localStorage.setItem(DRAFT_KEY, text);
}

// Restore a saved draft when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
  noteText.value = savedDraft;
}

// Update the counters for the restored draft
updateCounters();

// Update counters and save whenever the user types
noteText.addEventListener("input", updateCounters);

// Clear the text and remove the saved draft
clearBtn.addEventListener("click", () => {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounters();
  noteText.focus();
});

// Apply the saved theme
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  themeToggle.textContent = isDark
    ? "Light mode"
    : "Dark mode";
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark");

// Toggle and remember the selected theme
themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");

  applyTheme(isDark);

  localStorage.setItem(
    THEME_KEY,
    isDark ? "dark" : "light"
  );
});

// Escape clears the textarea and saved draft
noteText.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    noteText.value = "";
    localStorage.removeItem(DRAFT_KEY);
    updateCounters();
  }
});
