import { useId } from "react";

function Logo({ size = 40, showText = true, className = "" }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
        <span className="absolute -inset-[3px] overflow-hidden">
          <span className="absolute -inset-[50%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#f6e7bd_60deg,transparent_120deg,transparent_180deg,#c9a24a_240deg,transparent_300deg)]" />
        </span>
        <span className="absolute -inset-2 bg-gold-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
        <svg viewBox="0 0 48 48" className="relative h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f6e7bd" />
              <stop offset="0.5" stopColor="#c9a24a" />
              <stop offset="1" stopColor="#7d5f1f" />
            </linearGradient>
            <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="48" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" fill={`url(#${id}-gold)`} />
          <path d="M0 0h48v14C30 22 14 8 0 18z" fill={`url(#${id}-shine)`} />
          <path
            d="M10.5 13.5h4l4.2 16h15.1l3.4-11.5H16.4"
            fill="none"
            stroke="#08080a"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path d="M28.2 19.6l-4.6 5.2h3.4l-1.4 3.6 4.9-5.4h-3.4z" fill="#08080a" />
          <rect x="18.6" y="32.6" width="4.8" height="4.8" fill="#08080a" />
          <rect x="29.6" y="32.6" width="4.8" height="4.8" fill="#08080a" />
        </svg>
      </span>
      {showText && (
        <span className="font-display text-2xl font-semibold tracking-tight text-ivory">
          Shop<span className="text-gold italic">Kart</span>
        </span>
      )}
    </span>
  );
}

export default Logo;
