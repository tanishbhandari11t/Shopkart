function StockBadge({ stock }) {
  let styles = "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  let dot = "bg-emerald-400";
  let label = `${stock} units left`;
  let pulse = false;

  if (stock === 0) {
    styles = "border-red-400/20 bg-red-400/10 text-red-300";
    dot = "bg-red-400";
    label = "Out of stock";
  } else if (stock <= 5) {
    styles = "border-amber-400/20 bg-amber-400/10 text-amber-300";
    dot = "bg-amber-400";
    label = `Only ${stock} left`;
    pulse = true;
  }

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-75`} />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}

export default StockBadge;
