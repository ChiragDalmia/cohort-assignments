/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
  }

  str = str.toLowerCase().replace(/[^aeiou]/g, '');
  return str.length;
}

module.exports = countVowels;
