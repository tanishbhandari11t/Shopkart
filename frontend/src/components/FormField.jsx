function FormField({ label, name, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`input ${error ? "border-red-400/60 focus:border-red-400 focus:ring-red-500/15" : ""}`}
        {...inputProps}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default FormField;
