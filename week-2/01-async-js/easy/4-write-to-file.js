const fs = require('fs');

let content = "Hello World";



fs.writeFileSync('./4-write-to-file.txt', content, 'utf8');