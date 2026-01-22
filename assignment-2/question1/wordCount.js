const fs = require('fs');

// Read the input file
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading file');
    return;
  }

  // Count words
  const words = data.trim().split(/\s+/);
  const wordCount = words.length;

  // Write result to output file
  const result = `Word Count: ${wordCount}`;

  fs.writeFile('output.txt', result, (err) => {
    if (err) {
      console.log('Error writing file');
    } else {
      console.log('Word count written to output.txt');
    }
  });
});
