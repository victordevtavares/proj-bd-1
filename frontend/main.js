let backendServer = "http://localhost:8000";
let studentToBeRemovedId = 0;
let studentToBeEdited = 0;

$(document).ready(function () {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });

  $("#addStudentForm").submit(function (e) {
    e.preventDefault();
  });

  $("#addStudent").click(function () {
    addStudent();
  });

  $("#editStudent").click(function () {
    updateStudent();
  });

  $("#deleteStudent").click(function () {
    confirmDeleteStudent();
  });

  $(".search-button").click(function () {
    alert("Haha!! You'll have to implement this!");

    let nameToSearch = $(".search-box-input").val();
    getAllStudentsByNameLike(nameToSearch);
  });

  getAllStudents();
  clearStudentForm();
});

function getAllStudents() {
  var form = new FormData();

  var settings = {
    url: backendServer + "/students",
    method: "GET",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
  };

  $.ajax(settings).done(function (response) {
    let students = JSON.parse(response);
    console.log(students);
    let tableBody = "";

    if (students.length == 0) {
      $(".table.table-striped.table-hover").hide();
      $(".table.table-striped.table-hover").before(
        '<div class="no-student-div">Ainda não existem alunos cadastrados.</div>'
      );
    } else {
      $.each(students, function (key, value) {
        let row = `
        <tr id="${value.id}">
          <td>
            <span class="custom-checkbox">
              <input
                type="checkbox"
                id="checkbox1"
                name="options[]"
                value="1"
              />
              <label for="checkbox1"></label>
            </span>
          </td>
          <td>${value.id}</td>
          <td>${value.name}</td>
          <td>${value.course}</td>
          <td>${value.active == 1 ? "Sim" : "Não"}</td>
          <td>
            <a href="#editStudentModal" class="edit" data-toggle="modal" style="color: grey;">
              <i class="material-icons" data-toggle="tooltip" title="Edit" onclick="loadEditStudent(${
                value.id
              });">&#xE254;</i>
            </a>
            <a href="#deleteStudentModal" class="delete" data-toggle="modal" style="color: #F08080;">
              <i class="material-icons" data-toggle="tooltip" title="Delete" onclick="studentToBeRemoved(${
                value.id
              });">&#xE872;</i>
            </a>
          </td>
        </tr>
      `;
        tableBody += row;
      });
    }
    // console.log(tableBody);
    $("#maintable").append(tableBody);
  });
}

function getAllStudentsByNameLike(nameToSearch) {
  console.log(nameToSearch);
  // Construa a request para o endpoint do backend. No retorno, você pode usar renderização na tabela aproveitando o código abaixo:

  // let students = JSON.parse(response);
  // let tableBody = "";

  // if (students.length == 0) {
  //   $(".table.table-striped.table-hover").hide();
  //   $(".table.table-striped.table-hover").before(
  //     '<div class="no-student-div">Ainda não existem alunos cadastrados.</div>'
  //   );
  // } else {
  //   $.each(students, function (key, value) {
  //     let row = `
  //       <tr id="${value.id}">
  //         <td>
  //           <span class="custom-checkbox">
  //             <input
  //               type="checkbox"
  //               id="checkbox1"
  //               name="options[]"
  //               value="1"
  //             />
  //             <label for="checkbox1"></label>
  //           </span>
  //         </td>
  //         <td>${value.name}</td>
  //         <td>${value.email}</td>
  //         <td>${value.studentname}</td>
  //         <td>${value.type}</td>
  //         <td>${value.active == 1 ? "Sim" : "Não"}</td>
  //         <td>
  //           <a href="#editStudentModal" class="edit" data-toggle="modal" style="color: grey;">
  //             <i class="material-icons" data-toggle="tooltip" title="Edit" onclick="loadEditStudent(${
  //               value.id
  //             });">&#xE254;</i>
  //           </a>
  //           <a href="#deleteStudentModal" class="delete" data-toggle="modal" style="color: #F08080;">
  //             <i class="material-icons" data-toggle="tooltip" title="Delete" onclick="studentToBeRemoved(${
  //               value.id
  //             });">&#xE872;</i>
  //           </a>
  //         </td>
  //       </tr>
  //     `;

  //     tableBody += row;
  //   });
  // }
  // // console.log(tableBody);
  // $("#maintable").append(tableBody);
}

function addStudent() {
  if (
    !$("#addStudentFormCourse").val() ||
    !$("#addStudentFormName").val()
  ) {
    alert("Todos os campos são obrigatórios!");
  } else {
    console.log("entrou no else");
    var settings = {
      url: backendServer + "/students",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        course: $("#addStudentFormCourse").val(),
        name: $("#addStudentFormName").val().toUpperCase(),
        active: true,
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      if (response) {
        if (!alert("Aluno adicionado com sucesso!")) {
          clearStudentForm();
          window.location.reload();
        }
      } else {
        alert("Houve um problema ao tentar criar um aluno!")
      }
    });
  }
}

function studentToBeRemoved(id) {
  studentToBeRemovedId = id;
}

function loadEditStudent(id) {
  studentToBeEdited = id;
  var form = new FormData();
  var settings = {
    url: backendServer + "/students/" + id,
    method: "GET",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings).done(function (response) {
    let studentToBeEdited = JSON.parse(response);
    console.log(studentToBeEdited.studentname);
    if (response) {
      $("#editStudentFormRegister").val(studentToBeEdited.id);
      $("#editStudentFormCourse").val(studentToBeEdited.course);
      $("#editStudentFormName").val(studentToBeEdited.name);
    }
  });
}

function updateStudent() {
  if (
    !$("#editStudentFormRegister").val() ||
    !$("#editStudentFormCourse").val() ||
    !$("#editStudentFormName").val()
  ) {
    alert("Todos os campos são obrigatórios!");
  } else {
    console.log("entrou no else!");
    var settings = {
      url: backendServer + "/students/" + studentToBeEdited,
      method: "PUT",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: studentToBeEdited,
        studentname: $("#editStudentFormRegister").val().toUpperCase(),
        course: $("#editStudentFormCourse").val(),
        name: $("#editStudentFormName").val().toUpperCase(),
        active: $("#activeOpts").val().toUpperCase()
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      if (!alert("Aluno atualizado com sucesso!")) {
        window.location.reload();
      }
    });
  }
}

function confirmDeleteStudent() {
  console.log("Removing the student: ", studentToBeRemovedId);
  var settings = {
    url: backendServer + "/students/" + studentToBeRemovedId,
    method: "DELETE",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    if (!alert("Aluno removido com sucesso!")) {
      window.location.reload();
    }
  });
}

function clearStudentForm() {
  $("#addStudentFormRegister").val("");
  $("#addStudentFormCourse").val("");
  $("#addStudentFormName").val("");
}
