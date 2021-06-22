const conn = require('../config/db-conn.js');

module.exports = class Student {
  constructor(student) {
    this.id = student?.id;
    this.name = student?.name;
    this.course = student?.course;
    this.active = student?.active;
  };

  createStudent = (newStudent, result) => {
    conn.query("INSERT IGNORE INTO students SET ?", newStudent, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created student: ", { id: res.insertId, ...newStudent });
      result(null, { id: res.insertId, ...newStudent });
    });
  };
  
  getById = (studentId, result) => {
    conn.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Student with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  getAllStudents = result => {
    conn.query("SELECT * FROM students", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("students: ", res);
      result(null, res);
    });
  };
  
  updateById = (id, student, result) => {
    conn.query(
      "UPDATE students SET name = ?, course = ?, active = ? WHERE id = ?",
      [student.name, student.course, student.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Student with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated student: ", { id: id, ...student });
        result(null, { id: id, ...student });
      }
    );
  };
  
  remove = (id, result) => {
    conn.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted student with id: ", id);
      result(null, res);
    });
  };
  
  removeAll = result => {
    conn.query("DELETE FROM students", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} students`);
      result(null, res);
    });
  };

}
