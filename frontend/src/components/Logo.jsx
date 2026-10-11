import { useId } from "react";

function Logo({ size = 40, showText = true, className = "" }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
        <span className="absolute -inset-1.5 animate-[spin_6s_linear_infinite] rounded-[35%] bg-[conic-gradient(#8b5cf6,#ec4899,#f97316,#22d3ee,#8b5cf6)] opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <svg
          viewBox="0 0 48 48"
          className="relative h-full w-full transition duration-500 group-hover:-rotate-8 group-hover:scale-110"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c3aed" />
              <stop offset="0.55" stopColor="#db2777" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id={`${id}-shine`} x1="24" y1="0" x2="24" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity="0.45" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${id}-bg)`} />
          <path d="M2 16C2 8.3 8.3 2 16 2h16c7.7 0 14 6.3 14 14v2C34 24 16 12 2 22z" fill={`url(#${id}-shine)`} />
          <path
            d="M10.5 13.5h4l4.2 16h15.1l3.4-11.5H16.4"
            fill="none"
            stroke="#fff"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M28.2 19.6l-4.6 5.2h3.4l-1.4 3.6 4.9-5.4h-3.4z" fill="#fde68a" />
          <circle cx="21" cy="35" r="2.4" fill="#fff" />
          <circle cx="32" cy="35" r="2.4" fill="#fff" />
        </svg>
        <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#fcd34d]" />
        </span>
      </span>
      {showText && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          Shop<span className="text-gradient">Kart</span>
        </span>
      )}
    </span>
  );
}

export default Logo;
