module.exports = (app) => {
  const students = require("../controllers/student.js");

  // Create a new Student
  app.post("/students", students.create);

  // Retrieve all Students
  app.get("/students", students.getAll);

  // Retrieve a single Student with studentId
  app.get("/students/:studentId", students.get);

  // Update a Student with studentId
  app.put("/students/:studentId", students.update);

  // Delete a Student with studentId
  app.delete("/students/:studentId", students.delete);

  // Delete all Students
  app.delete("/students", students.deleteAll);
};