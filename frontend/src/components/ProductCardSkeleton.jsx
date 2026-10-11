function ProductCardSkeleton() {
  return (
    <div className="panel flex flex-col">
      <div className="skeleton aspect-[4/3]" />
      <div className="flex flex-col gap-3 border-t border-gold-500/10 p-5">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-6 w-1/2" />
        <div className="skeleton mt-3 h-11" />
        <div className="skeleton h-11" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
