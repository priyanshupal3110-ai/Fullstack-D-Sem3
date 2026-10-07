// let student_arr = [
//     { name: "Rahul", age: 20 },
//     {
// name: "Rohit", age: 22 
// },
//     { name: "Puneet", age: 61 }
// ];
// function displayStudent (data) {
//     for (let student of data) {
//     console.log(student.name , student.age);
//     }
//  }
// displayStudent(student_arr);    

const student = {
    name: "Rahul",
    marks: [80, 90, 85]
};

function calculateTotal(student) {
    let total = 0;
    for (let marks of student.marks) {
        total += marks;
    }
    return total;
}

function displayStudent(student) {
    console.log(student.name, calculateTotal(student));
}

let result = calculateTotal(student);
console.log(result);
displayStudent(student);