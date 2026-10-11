function SpotlightCard({ as: Tag = "div", className = "", children, ...props }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onMouseMove={handleMouseMove} className={`spotlight relative ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default SpotlightCard;
