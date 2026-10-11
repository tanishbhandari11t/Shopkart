import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import SearchBar, { CATEGORIES } from "../components/SearchBar.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { getProducts, getWishlist } from "../services/api";

function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = CATEGORIES.includes(searchParams.get("category"))
    ? searchParams.get("category")
    : "All";

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("newest");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [wishlistIds, setWishlistIds] = useState(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    const params = { sort };
    if (debouncedSearch) params.search = debouncedSearch;
    if (category !== "All") params.category = category;

    getProducts(params)
      .then(({ data }) => {
        if (!ignore) setProducts(data.products);
      })
      .catch(() => {
        if (!ignore) setError("Something went wrong while loading products.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [debouncedSearch, category, sort, reloadKey]);

  useEffect(() => {
    getWishlist()
      .then(({ data }) => setWishlistIds(new Set(data.wishlist.map((item) => item._id))))
      .catch(() => setWishlistIds(new Set()));
  }, []);

  let content;
  if (loading) {
    content = (
      <div>
        <p className="mb-4 flex items-center gap-2 text-sm text-slate-400">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-fuchsia-400/30 border-t-fuchsia-400" />
          Loading products...
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <StatusMessage
        type="error"
        icon="⚠️"
        title={error}
        action={
          <button className="btn-primary" onClick={() => setReloadKey((key) => key + 1)}>
            Try Again
          </button>
        }
      />
    );
  } else if (products.length === 0) {
    content = (
      <StatusMessage
        icon="🔍"
        title="No products found."
        message="Try a different search term or category."
      />
    );
  } else {
    content = (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            index={index}
            inWishlist={wishlistIds.has(product._id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex animate-fade-up flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-fuchsia-300">Discover</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-white sm:text-5xl">
            Explore <span className="text-gradient">Products</span>
          </h1>
        </div>
        {!loading && !error && (
          <span className="glass rounded-full px-4 py-1.5 text-sm text-slate-300">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </span>
        )}
      </div>

      <div className="animate-fade-up [animation-delay:100ms]">
        <SearchBar
          search={search}
          category={category}
          sort={sort}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
      </div>

      {content}
    </div>
  );
}

export default Products;
