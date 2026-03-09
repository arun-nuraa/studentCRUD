import { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, updateStudent }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.age) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      alert("Invalid Email");
      return false;
    }
    const nameRegex = /^[A-Za-z\s]{2,}$/;

    if (!nameRegex.test(form.name)) {
      alert("Invalid Name (Only letters allowed)");
      return false;
    }

    const ageRegex = /^(?:1[01][0-9]|120|[1-9][0-9]?)$/;

    if (!ageRegex.test(form.age)) {
      alert("Invalid Age (Enter age between 1 and 120)");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({
      name: "",
      email: "",
      age: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <button type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
