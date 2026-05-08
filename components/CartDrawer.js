"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/money";

export default function CartDrawer() {
  const { cartOpen, lineItems, setCartOpen, subtotal } = useCart();

  if (!cartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={() => setCartOpen(false)}
      />
      <div className="animate-slide-in fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-display text-xl">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {lineItems.length === 0 ? (
            <p className="mt-20 text-center text-stone-500">Your cart is empty</p>
          ) : (
            lineItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-stone-100 py-4">
                <img
                  src={item.variant.image?.src || "/placeholder.svg"}
                  alt={item.title}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-stone-500">{item.variant.title}</p>
                  <p className="text-xs">Qty: {item.quantity}</p>
                  <p className="mt-1 font-medium">
                    {formatMoney(Number.parseFloat(item.variant.price.amount) * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {lineItems.length > 0 && (
          <div className="space-y-3 border-t p-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full rounded-lg bg-rose-700 py-3 text-center font-medium text-white transition hover:bg-rose-800"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
