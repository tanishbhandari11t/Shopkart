function StockBadge({ stock }) {
  let styles = "border-emerald-400/30 text-emerald-300";
  let dot = "bg-emerald-400";
  let label = `${stock} units left`;
  let pulse = false;

  if (stock === 0) {
    styles = "border-red-400/30 text-red-300";
    dot = "bg-red-400";
    label = "Out of stock";
  } else if (stock <= 5) {
    styles = "border-gold-400/40 text-gold-300";
    dot = "bg-gold-400";
    label = `Only ${stock} left`;
    pulse = true;
  }

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${styles}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && <span className={`absolute inline-flex h-full w-full animate-ping ${dot} opacity-75`} />}
        <span className={`relative inline-flex h-1.5 w-1.5 ${dot}`} />
      </span>
      {label}
    </span>
  );
}

export default StockBadge;
