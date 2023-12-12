const fs = require('fs');

fs.readFile('./1-file-cleaner.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file:" + err);
    } else {
        let cleanedData = data.replace(/\s{2,}/g, " ");
        fs.writeFile('./1-file-cleaner.txt', cleanedData, 'utf8', (err) => {
            if (err) {
                console.log("Error writing file:" + err);
            }
        });
    }
});