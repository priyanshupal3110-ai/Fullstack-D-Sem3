// const fs = require('fs');
// try {
//     const data = fs.readFileSync('data.txt', 'utf8');
//     console.log(data);
// }catch (err) {
//     console.log("Error:",err);
// }
const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    console.log("File Content:");
    console.log(data);
});