// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes by word
function searchNotes(word) {
  const searchWord = word.trim().toLowerCase();

  return notes.filter((note) =>
    note.text.toLowerCase().includes(searchWord)
  );
}

// Test searchNotes
console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("pizza"));
// Expected: []

// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  notes.forEach((note) => {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  });

  return longest;
}

// Test longestNote
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

console.log(longestNote().text.length);
// Expected: 35

// 3. Count notes by category
function countByCategory() {
  const counts = {};

  notes.forEach((note) => {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  });

  return counts;
}

// Test countByCategory
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

console.log(countByCategory().work);
// Expected: 1

// 4. Get a summary
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${
    counts.work || 0
  } work, ${counts.study || 0} study.`;
}

// Test getSummary
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

console.log(notes.length);
// Expected: 5

// 5. Check for duplicate notes
function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === cleanedText
  );
}

// Test isDuplicate
console.log(isDuplicate("  CALL MUM  "));
// Expected: true

console.log(isDuplicate("Go shopping"));
// Expected: false

// 6. Add a note
function addNote(text, category) {
  const cleanedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length === 0 || cleanedText.length > 200) {
    console.log("❌ Note rejected: must be 1-200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("❌ Note rejected: duplicate note.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("❌ Note rejected: invalid category.");
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category,
  };

  notes.push(newNote);

  console.log(`✅ Added: "${newNote.text}"`);
  return true;
}

// Test addNote - normal case
console.log(addNote("Study JavaScript functions", "study"));
// Expected: true

// Test addNote - duplicate
console.log(addNote("  CALL MUM  ", "personal"));
// Expected: false

// Test addNote - invalid category
console.log(addNote("Go for a walk", "fitness"));
// Expected: false

// Test addNote - empty text
console.log(addNote("   ", "personal"));
// Expected: false

// Test addNote - valid note after adding
console.log(getSummary());
// Expected: "6 notes: 2 personal, 1 work, 3 study."
