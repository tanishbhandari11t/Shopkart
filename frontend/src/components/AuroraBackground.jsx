function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-blob rounded-full bg-violet-600/30 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] animate-blob rounded-full bg-fuchsia-600/25 blur-[120px] [animation-delay:-7s]" />
      <div className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] animate-blob rounded-full bg-orange-500/15 blur-[120px] [animation-delay:-14s]" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}

export default AuroraBackground;
