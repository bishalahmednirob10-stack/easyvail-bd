"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/money";

export default function CartPage() {
  const { lineItems, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display mb-8 text-3xl">Cart</h1>
      {lineItems.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-8 text-center">
          <p className="text-stone-500">Your cart is empty.</p>
          <Link href="/" className="mt-4 inline-block text-rose-700 underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {lineItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-stone-200 pb-4">
              <img
                src={item.variant.image?.src || "/placeholder.svg"}
                alt={item.title}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex-1">
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-sm text-stone-500">{item.variant.title}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">
                {formatMoney(Number.parseFloat(item.variant.price.amount) * item.quantity)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="block rounded-lg bg-rose-700 py-3 text-center font-medium text-white transition hover:bg-rose-800"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
