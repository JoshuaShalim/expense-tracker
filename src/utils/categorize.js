// src/utils/categorize.js
// Enhanced client-side categorizer
// Case-insensitive, plural-insensitive, substring-aware, optional fuzzy matching

const KEYWORD_MAP = {
  // ... paste your full KEYWORD_MAP from backend here ...
  "coffee": "Food & Drinks",
  "starbucks": "Food & Drinks",
  "latte": "Food & Drinks",
  "mcdonald": "Food & Drinks",
  "burger": "Food & Drinks",
  "kfc": "Food & Drinks",
  "subway": "Food & Drinks",
  "pizza": "Food & Drinks",
  "restaurant": "Food & Drinks",
  "dining": "Food & Drinks",
  "food": "Food & Drinks",
  "drink": "Food & Drinks",
  "juice": "Food & Drinks",
  "soda": "Food & Drinks",
  "tea": "Food & Drinks",
  "milk": "Food & Drinks",
  "sandwich": "Food & Drinks",
  "bread": "Food & Drinks",
  "grocery": "Food & Drinks",
  "snack": "Food & Drinks",
  "lunch": "Food & Drinks",
  "dinner": "Food & Drinks",
  "breakfast": "Food & Drinks",
  "cafe": "Food & Drinks",
  "greeno": "Food & Drinks",
  "uber": "Transport",
  "taxi": "Transport",
  "lyft": "Transport",
  "gas": "Transport",
  "petrol": "Transport",
  "bus": "Transport",
  "train": "Transport",
  "parking": "Transport",
  "fuel": "Transport",
  "ride": "Transport",
  "transport": "Transport",
  "rent": "Housing",
  "apartment": "Housing",
  "mortgage": "Housing",
  "utilities": "Housing",
  "electricity": "Housing",
  "water": "Housing",
  "internet": "Housing",
  "wifi": "Housing",
  "house": "Housing",
  "room": "Housing",
  "lease": "Housing",
  "netflix": "Entertainment",
  "spotify": "Entertainment",
  "disney": "Entertainment",
  "hulu": "Entertainment",
  "movie": "Entertainment",
  "cinema": "Entertainment",
  "game": "Entertainment",
  "concert": "Entertainment",
  "theater": "Entertainment",
  "tv": "Entertainment",
  "show": "Entertainment",
  "music": "Entertainment",
  "gym": "Health & Fitness",
  "pharmacy": "Health & Fitness",
  "hospital": "Health & Fitness",
  "doctor": "Health & Fitness",
  "yoga": "Health & Fitness",
  "fitness": "Health & Fitness",
  "protein": "Health & Fitness",
  "medicine": "Health & Fitness",
  "drug": "Health & Fitness",
  "clinic": "Health & Fitness",
  "health": "Health & Fitness",
  "amazon": "Shopping",
  "walmart": "Shopping",
  "aldi": "Shopping",
  "target": "Shopping",
  "ikea": "Shopping",
  "mall": "Shopping",
  "clothes": "Shopping",
  "electronics": "Shopping",
  "shop": "Shopping",
  "store": "Shopping",
  "fashion": "Shopping",
  "apparel": "Shopping",
  "tuition": "Education",
  "school": "Education",
  "college": "Education",
  "university": "Education",
  "course": "Education",
  "books": "Education",
  "class": "Education",
  "study": "Education",
  "exam": "Education",
  "hotel": "Travel",
  "airbnb": "Travel",
  "flight": "Travel",
  "ticket": "Travel",
  "holiday": "Travel",
  "travel": "Travel",
  "cruise": "Travel",
  "trip": "Travel",
  "vacation": "Travel",
  "tour": "Travel",
  "resort": "Travel"
};

// ---------------- Utility Functions ---------------- //

function normalizeWord(word) {
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("es")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function cleanText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/gi, " ").replace(/\s+/g, " ").trim();
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = a[i - 1] === b[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[a.length][b.length];
}

// ---------------- Categorizer ---------------- //

export function suggestCategory(description = '', merchant = '', fuzzy = true) {
  const text = cleanText(`${description} ${merchant}`);

  for (const kw of Object.keys(KEYWORD_MAP)) {
    const normKw = normalizeWord(kw.toLowerCase());
    if (text.includes(normKw)) return KEYWORD_MAP[kw];
  }

  if (fuzzy) {
    const words = text.split(" ");
    for (const word of words) {
      for (const kw of Object.keys(KEYWORD_MAP)) {
        const normKw = normalizeWord(kw.toLowerCase());
        if (levenshtein(word, normKw) <= 1) return KEYWORD_MAP[kw];
      }
    }
  }

  return 'Other';
}
