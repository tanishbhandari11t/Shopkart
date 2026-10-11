function StatusMessage({ type = "info", icon, title, message, action }) {
  return (
    <div className="flex animate-fade-up flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      {type === "loading" ? (
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent,#d946ef,#f97316)] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_calc(100%-4px))]" />
          <div className="absolute inset-3 animate-pulse rounded-full bg-fuchsia-500/20 blur-sm" />
        </div>
      ) : (
        icon && (
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full blur-2xl ${
                type === "error" ? "bg-red-500/30" : "bg-fuchsia-500/30"
              }`}
            />
            <div className="glass relative flex h-20 w-20 animate-float items-center justify-center rounded-3xl text-4xl">
              {icon}
            </div>
          </div>
        )
      )}
      {title && (
        <h2
          className={`font-display text-xl font-semibold ${
            type === "error" ? "text-red-300" : "text-white"
          }`}
        >
          {title}
        </h2>
      )}
      {message && <p className="max-w-sm text-sm text-slate-400">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default StatusMessage;
