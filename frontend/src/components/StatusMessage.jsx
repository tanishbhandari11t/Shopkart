import Corners from "./Corners.jsx";

function StatusMessage({ type = "info", icon, title, message, action }) {
  return (
    <div className="flex animate-fade-up flex-col items-center justify-center gap-5 px-4 py-24 text-center">
      {type === "loading" ? (
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin border-2 border-gold-500/15 border-t-gold-400" />
          <div className="absolute inset-3 animate-pulse bg-gold-500/15" />
        </div>
      ) : (
        icon && (
          <div className="group relative">
            <div className={`absolute inset-0 blur-2xl ${type === "error" ? "bg-red-500/20" : "bg-gold-500/20"}`} />
            <div className="panel relative flex h-20 w-20 animate-float items-center justify-center text-4xl">
              <Corners />
              {icon}
            </div>
          </div>
        )
      )}
      {title && (
        <h2 className={`font-display text-2xl font-semibold ${type === "error" ? "text-red-300" : "text-ivory"}`}>
          {title}
        </h2>
      )}
      {message && <p className="max-w-sm text-sm leading-relaxed text-stone-400">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default StatusMessage;
