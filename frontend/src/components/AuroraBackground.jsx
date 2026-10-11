function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="absolute -top-60 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(201_162_74/0.18),transparent_65%)]" />
      <div className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] animate-drift rounded-full bg-gold-600/10 blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] animate-drift rounded-full bg-amber-900/20 blur-[140px] [animation-delay:-12s]" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}

export default AuroraBackground;
