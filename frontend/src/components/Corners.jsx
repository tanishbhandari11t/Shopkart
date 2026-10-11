const base =
  "pointer-events-none absolute z-20 h-3 w-3 border-gold-400 transition-all duration-500 group-hover:h-6 group-hover:w-6";

function Corners() {
  return (
    <>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export default Corners;
