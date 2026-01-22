// Capitalize first letter of each word
function capitalize(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Count vowels in a string
function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

// Export all functions
module.exports = {
  capitalize,
  reverseString,
  countVowels
};
