function Toast({ message, type = "success" }) {
  const styles = {
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    info: "bg-sky-500/10 border-sky-500/20 text-sky-400",
  };

  const icons = {
    success: "✅",
    error: "🗑️",
    info: "✏️",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl backdrop-blur-sm animate-slide-up ${styles[type]}`}
    >
      <span>{icons[type]}</span>
      {message}
    </div>
  );
}

export default Toast;
