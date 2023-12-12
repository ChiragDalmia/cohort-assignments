const fs = require('fs');

fs.readFile('./3-read-from-file.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file:" + err);
    } else {
        console.log(data);
    }
});

// do some expensive operation

function calculateFibonacci(n) {
  if (n <= 1) {
      return n;
  } else {
      return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
  }
}

// Example of an expensive call
const result = calculateFibonacci(40);
console.log(result);
