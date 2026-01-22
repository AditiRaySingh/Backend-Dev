function capitalize(str) {
  return str.toUpperCase();
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function countVowels(str) {
  let count = 0;
  let vowels = "aeiouAEIOU";

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }
  return count;
}

module.exports = {
  capitalize,
  reverse,
  countVowels
};
