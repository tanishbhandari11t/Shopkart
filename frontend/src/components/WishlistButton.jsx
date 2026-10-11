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
        className={`flex w-full items-center justify-center gap-2 border px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition duration-300 disabled:cursor-wait disabled:opacity-60 ${
          saved
            ? "border-gold-400/70 bg-gold-500/15 text-gold-200 hover:bg-gold-500/25"
            : "border-white/15 text-stone-300 hover:border-gold-400/60 hover:text-gold-200"
        }`}
      >
        <span key={String(saved)} className={`text-sm tracking-normal ${saved ? "animate-pop" : ""}`}>
          {saving ? "⏳" : saved ? "♥" : "♡"}
        </span>
        {label}
      </button>
      {justAdded && !saving && (
        <p className="mt-2 animate-fade-up text-[11px] font-medium uppercase tracking-[0.15em] text-gold-300">
          ♥ Added to Wishlist
        </p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default WishlistButton;
