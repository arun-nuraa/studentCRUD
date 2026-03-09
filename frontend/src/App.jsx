import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from LocalStorage
  useEffect(() => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("students")) || [];
      setStudents(data);
      setLoading(false);
    }, 1000);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add Student
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  // Update Student
  const updateStudent = (updated) => {
    const updatedList = students.map((s) =>
      s.id === updated.id ? updated : s,
    );
    setStudents(updatedList);
    setEditStudent(null);
  };

  // Delete Student
  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const filtered = students.filter((s) => s.id !== id);
      setStudents(filtered);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading Students...</h2>;
  }

  return (
    <div className="container">
      <h1>Student Management</h1>

      <StudentForm
        addStudent={addStudent}
        editStudent={editStudent}
        updateStudent={updateStudent}
      />

      <StudentTable
        students={students}
        deleteStudent={deleteStudent}
        setEditStudent={setEditStudent}
      />
    </div>
  );
}

export default App;
