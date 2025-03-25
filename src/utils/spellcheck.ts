
// This is a simplified spellcheck utility
// In a real implementation, this would connect to a proper API

// Sample common misspellings and their corrections
const commonMisspellings: Record<string, string> = {
  "teh": "the",
  "recieve": "receive",
  "seperate": "separate",
  "definately": "definitely",
  "accomodate": "accommodate",
  "occassion": "occasion",
  "occured": "occurred",
  "untill": "until",
  "wierd": "weird",
  "acheive": "achieve",
  "beleive": "believe",
  "concious": "conscious",
  "enviroment": "environment",
  "existance": "existence",
  "foriegn": "foreign",
  "gaurd": "guard",
  "greatful": "grateful",
  "highschool": "high school",
  "independant": "independent",
  "knowlege": "knowledge",
  "neccessary": "necessary",
  "occassionally": "occasionally",
  "persistant": "persistent",
  "prefered": "preferred",
  "priviledge": "privilege",
  "recomend": "recommend",
  "relevent": "relevant",
  "rythm": "rhythm",
  "tendancy": "tendency",
  "threshhold": "threshold",
  "tommorrow": "tomorrow",
  "truely": "truly",
  "useable": "usable",
  "vaccum": "vacuum",
  "wether": "whether"
};

// Basic sentence structure improvements
const improveSentenceStructure = (text: string): string => {
  // Ensure sentence starts with capital letter
  text = text.replace(/(\.\s+|^)([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`);
  
  // Add space after punctuation if missing
  text = text.replace(/([.,!?;:])([a-zA-Z])/g, '$1 $2');
  
  // Remove double spaces
  text = text.replace(/\s+/g, ' ');
  
  // Fix common sentence structure issues
  text = text.replace(/\si\s/g, ' I ');
  
  return text;
};

// Check spelling using our common misspellings dictionary
const fixSpelling = (text: string): string => {
  let words = text.split(/\b/);
  return words.map(word => {
    const lowerWord = word.toLowerCase();
    if (commonMisspellings[lowerWord]) {
      // Preserve capitalization
      if (word[0] === word[0].toUpperCase()) {
        return commonMisspellings[lowerWord].charAt(0).toUpperCase() + 
               commonMisspellings[lowerWord].slice(1);
      }
      return commonMisspellings[lowerWord];
    }
    return word;
  }).join('');
};

// Main function to check spelling and improve text
export const checkSpelling = async (text: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Process the text
  let correctedText = text;
  correctedText = fixSpelling(correctedText);
  correctedText = improveSentenceStructure(correctedText);
  
  return correctedText;
};
