"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/money";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price?.amount;
  const image = product.images?.[0]?.src || "/placeholder.svg";
  const hasShopifyVariant = Boolean(firstVariant?.id);

  return (
    <div className="group">
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-widest text-stone-700 shadow-sm">
            {product.material || product.productType || "Hijab"}
          </span>
        </div>
      </Link>
      <div className="mt-3 space-y-2">
        <p className="text-xs uppercase tracking-wider text-stone-500">
          {product.productType || "Hijab"}
        </p>
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-display text-lg font-medium transition hover:text-rose-700">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-stone-500">{product.color || "Elegant finish"}</p>
        {price && <p className="font-medium">{formatMoney(price)}</p>}
        {hasShopifyVariant ? (
          <button
            onClick={() => addToCart(firstVariant.id, 1)}
            className="mt-2 w-full rounded-md border border-stone-300 py-2 text-sm transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
          >
            Add to Cart
          </button>
        ) : (
          <Link
            href={`/products/${product.handle}`}
            className="mt-2 block w-full rounded-md border border-stone-300 py-2 text-center text-sm transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
