function FormField({ label, name, error, ...inputProps }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`input ${error ? "border-red-400/60 focus:border-red-400 focus:ring-red-500/30" : ""}`}
        {...inputProps}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default FormField;
