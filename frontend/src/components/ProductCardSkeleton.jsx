function ProductCardSkeleton() {
  return (
    <div className="glass flex flex-col overflow-hidden rounded-3xl">
      <div className="skeleton m-2 aspect-[4/3] rounded-2xl" />
      <div className="flex flex-col gap-3 px-5 pb-5 pt-2">
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="skeleton h-7 w-1/2 rounded-lg" />
        <div className="skeleton mt-2 h-10 rounded-xl" />
        <div className="skeleton h-10 rounded-xl" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
