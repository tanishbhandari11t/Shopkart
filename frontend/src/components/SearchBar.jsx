export const CATEGORIES = ["All", "Electronics", "Fashion", "Books", "Home"];

function SearchBar({ search, category, sort, onSearchChange, onCategoryChange, onSortChange }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative sm:flex-1">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="input pl-11"
          />
        </div>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input sm:w-52"
          aria-label="Category"
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input sm:w-56"
          aria-label="Sort"
        >
          <option value="newest">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            className={`border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] transition duration-300 ${
              category === item
                ? "border-gold-400 bg-gold-500 text-ink-950"
                : "border-white/10 text-stone-400 hover:border-gold-500/50 hover:text-gold-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
