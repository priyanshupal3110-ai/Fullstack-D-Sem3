const express = require('express');
const app = express();
let students = [
  { id: 1, name: 'John Doe', age: 20 },
  { id: 2, name: 'Jane Smith', age: 22 },
  { id: 3, name: 'Bob Johnson', age: 21 }
];
app.get('/students', (req, res) => {
  res.json(students);
});
app.get('/students/:id', (req, res) => {
    const id =Number(req.params.id);
    const student = students.find(s => s.id === id);
    if(! student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
});
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});