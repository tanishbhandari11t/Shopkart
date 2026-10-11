export const CATEGORIES = ["All", "Electronics", "Fashion", "Books", "Home"];

function SearchBar({ search, category, sort, onSearchChange, onCategoryChange, onSortChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative sm:flex-1">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
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
            className="input py-3 pl-11"
          />
        </div>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input py-3 sm:w-48"
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
          className="input py-3 sm:w-52"
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
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition duration-300 ${
              category === item
                ? "border-transparent bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-[0_0_20px_-4px_rgb(219_39_119/0.7)]"
                : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white"
            }`}
          >
            {item === "All" ? "All" : item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
