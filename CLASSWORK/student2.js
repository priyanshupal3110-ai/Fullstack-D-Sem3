const express = require('express');
const app = express();
 app.use(express.json());
let students = [
  { id: 1, name: 'John Doe', age: 20 },
  { id: 2, name: 'Jane Smith', age: 22 },
  { id: 3, name: 'Bob Johnson', age: 21 }
];
app.get('/', (req, res) => {
  res.send(" server is running");
});
app.get('/students', (req, res) => {
  const newStudents = req.body;
  students.push(newStudents);
  res.status(201).json({ message: 'Student added successfully', student: newStudents });
});

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});