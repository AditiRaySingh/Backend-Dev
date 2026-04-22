const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("errorr");
        return;
    }

    let words = data.split(" ");
    let count = words.length;

    console.log("Total words:", count);

    fs.writeFile('output.txt', "word counting is: " + count, (err) => {
        if (err) {
            console.log("Errorrr");
            return;
        }
        console.log("Doneeee");
    });
});