import { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, updateStudent, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (editStudent) setForm(editStudent);
    else setForm({ name: "", email: "", age: "" });
    setErrors({});
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    else if (!/^[A-Za-z\s]{2,}$/.test(form.name))
      newErrors.name = "Only letters, min 2 chars";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.age) newErrors.age = "Age is required";
    else if (!/^(?:1[01][0-9]|120|[1-9][0-9]?)$/.test(form.age))
      newErrors.age = "Age must be 1–120";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (editStudent) updateStudent(form);
    else addStudent(form);
    setForm({ name: "", email: "", age: "" });
    setErrors({});
  };

  const fields = [
    { name: "name", placeholder: "Full Name", icon: "👤", type: "text" },
    { name: "email", placeholder: "Email Address", icon: "✉️", type: "email" },
    { name: "age", placeholder: "Age", icon: "🎂", type: "number" },
  ];

  return (
    <div
      className={`bg-[#111827] border border-white/5 rounded-2xl p-6 shadow-xl ${shake ? "animate-shake" : ""}`}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">
          {editStudent ? "✏️ Edit Student" : "➕ Add New Student"}
        </h2>
        {editStudent && (
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1 rounded-lg border border-white/10 hover:border-white/20"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(({ name, placeholder, icon, type }) => (
          <div key={name} className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-2 bg-[#0b0f1a] border rounded-xl px-4 py-3 transition-all
              ${errors[name] ? "border-red-500/60" : "border-white/10 focus-within:border-amber-400/50"}`}
            >
              <span className="text-base select-none">{icon}</span>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
              />
            </div>
            {errors[name] && (
              <p className="text-xs text-red-400 pl-1 animate-fade-in">
                {errors[name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0b0f1a] font-semibold text-sm rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-500/20"
        >
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </div>
  );
}

export default StudentForm;
