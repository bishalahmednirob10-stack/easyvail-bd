"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ variants }) {
  const { addToCart, cartError } = useCart();
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    if (variants.length > 0) {
      const didAdd = await addToCart(variants[0].id, 1);

      if (didAdd) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleAdd}
        disabled={variants.length === 0}
        className={`w-full rounded-lg py-4 text-lg font-medium transition ${
          added
            ? "bg-green-600 text-white"
            : "bg-rose-700 text-white hover:bg-rose-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        }`}
      >
        {variants.length === 0 ? "Sold Out" : added ? "Added to Cart!" : "Add to Cart"}
      </button>
      {cartError && <p className="text-sm text-rose-700">Connect Shopify to enable cart.</p>}
    </div>
  );
}
