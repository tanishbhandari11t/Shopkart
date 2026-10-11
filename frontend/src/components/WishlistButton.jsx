import { useEffect, useState } from "react";
import { getErrorMessage, notifyWishlistChanged, toggleWishlist } from "../services/api";

function WishlistButton({ productId, initialSaved = false, className = "" }) {
  const [saved, setSaved] = useState(initialSaved);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  const handleClick = async () => {
    if (saving) return;

    setSaving(true);
    setError("");
    setJustAdded(false);
    try {
      const { data } = await toggleWishlist(productId);
      setSaved(data.inWishlist);
      setJustAdded(data.inWishlist);
      notifyWishlistChanged();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to save product. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  let label = "Add to Wishlist";
  if (saving) label = "Saving...";
  else if (saved) label = "Remove from Wishlist";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={saving}
        className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition duration-300 disabled:cursor-wait disabled:opacity-70 ${
          saved
            ? "border-pink-400/40 bg-pink-500/15 text-pink-300 shadow-[0_0_24px_-6px_rgb(236_72_153/0.6)] hover:bg-pink-500/25"
            : "border-white/15 bg-white/5 text-slate-200 hover:border-pink-400/40 hover:text-pink-300"
        }`}
      >
        <span key={String(saved)} className={saved ? "animate-pop" : ""}>
          {saving ? "⏳" : saved ? "♥" : "♡"}
        </span>
        {label}
      </button>
      {justAdded && !saving && (
        <p className="mt-1.5 animate-fade-up text-xs font-medium text-pink-300">♥ Added to Wishlist</p>
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default WishlistButton;
