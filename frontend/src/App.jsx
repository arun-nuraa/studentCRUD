import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import ConfirmDialog from "./components/ConfirmDialog";
import Toast from "./components/Toast";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmState, setConfirmState] = useState({ open: false, id: null });
  const [toast, setToast] = useState(null);

  // Simulate loading from localStorage with a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = localStorage.getItem("students");
      setStudents(data ? JSON.parse(data) : []);
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loading]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents([...students, newStudent]);
    showToast("Student added successfully!");
  };

  const updateStudent = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
    setEditStudent(null);
    showToast("Student updated!", "info");
  };

  const deleteStudent = (id) => {
    setConfirmState({ open: true, id });
  };

  const handleConfirmDelete = () => {
    const filtered = students.filter((s) => s.id !== confirmState.id);
    setStudents(filtered);
    setConfirmState({ open: false, id: null });
    showToast("Student deleted.", "error");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] font-['Sora',sans-serif] text-slate-100">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in-down">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#0b0f1a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">
              Academia
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Student Registry
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Manage, track, and export your student records
          </p>
        </div>

        {/* Form */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <StudentForm
            addStudent={addStudent}
            editStudent={editStudent}
            updateStudent={updateStudent}
            onCancel={() => setEditStudent(null)}
          />
        </div>

        {/* Table */}
        <div
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <StudentTable
            students={students}
            loading={loading}
            deleteStudent={deleteStudent}
            setEditStudent={setEditStudent}
          />
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmState.open}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmState({ open: false, id: null })}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
