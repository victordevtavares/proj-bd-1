const Student = require("../models/student.js");

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Student
  const student = new Student({
    name: req.body.name.toUpperCase(),
    course: req.body.course,
    active: req.body.active,
  });

  // Save Student in the database
  Student.createStudent(student, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Student.",
      });
    else res.send(data);
  });
};

// Retrieve all Students from the database.
exports.getAll = (req, res) => {
  Student.getAllStudents((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students.",
      });
    else res.send(data);
  });
};

// Find a single Student with a studentId
exports.get = (req, res) => {
  Student.getById(req.params.studentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.studentId,
        });
      }
    } else res.send(data);
  });
};

// Update a Student identified by the studentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Student.updateById(req.params.studentId, new Student(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Student with id " + req.params.studentId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Student with the specified studentId in the request
exports.delete = (req, res) => {
  Student.remove(req.params.studentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.studentId,
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all students.",
      });
    else res.send({ message: `All Students were deleted successfully!` });
  });
};
