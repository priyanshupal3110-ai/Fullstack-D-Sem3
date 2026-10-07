const express = require('express');
const app=express();
let students = [
    {id: 1, name: 'John Doe', age: 20},
    {id: 2, name: 'Jane Smith', age: 22}
];
app.get('/students', (req, res) => {
    res.json(students);
});
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});