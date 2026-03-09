import { exportToExcel } from "../utils/exportExcel";

function SkeletonRow() {
  return (
    <tr className="border-b border-white/5">
      {[1, 2, 3, 4].map((i) => (
        <td key={i} className="px-5 py-4">
          <div
            className="h-4 bg-white/5 rounded-lg animate-pulse"
            style={{ width: `${60 + i * 10}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={4} className="text-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
            📭
          </div>
          <p className="text-slate-400 text-sm">
            No students yet. Add your first one above!
          </p>
        </div>
      </td>
    </tr>
  );
}

function StudentTable({ students, loading, deleteStudent, setEditStudent }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
      {/* Table Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">All Students</h2>
          {!loading && (
            <span className="text-xs bg-amber-400/10 text-amber-400 font-medium px-2 py-0.5 rounded-full">
              {students.length}
            </span>
          )}
        </div>
        <button
          onClick={() => exportToExcel(students)}
          disabled={loading || students.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl border border-emerald-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 uppercase tracking-widest border-b border-white/5">
              <th className="px-5 py-3 text-left font-medium">#</th>
              <th className="px-5 py-3 text-left font-medium">Name</th>
              <th className="px-5 py-3 text-left font-medium">Email</th>
              <th className="px-5 py-3 text-left font-medium">Age</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : students.length === 0 ? (
              <EmptyState />
            ) : (
              students.map((s, index) => (
                <tr
                  key={s.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-5 py-4 text-slate-500 text-xs">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-400/10 flex items-center justify-center text-xs font-bold text-amber-400">
                        {s.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{s.email}</td>
                  <td className="px-5 py-4">
                    <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-1 rounded-full font-medium">
                      {s.age} yrs
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditStudent(s)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/10 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
