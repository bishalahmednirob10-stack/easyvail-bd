"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/money";

export default function CheckoutPage() {
  const { lineItems, subtotal } = useCart();
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [trxID, setTrxID] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  const deliveryCharge = 80;
  const total = subtotal + deliveryCharge;

  function handleFormSubmit(event) {
    event.preventDefault();
    setStep("payment");
  }

  function handleConfirmOrder() {
    setStep("done");
  }

  if (lineItems.length === 0 && step !== "done") {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display mb-4 text-2xl">Your cart is empty</h1>
        <a href="/" className="text-rose-700 underline">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display mb-8 text-center text-3xl">Checkout</h1>

      {step === "form" && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h2 className="text-lg font-medium">Shipping Details</h2>
          <input
            required
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-md border border-stone-300 p-3"
          />
          <input
            required
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full rounded-md border border-stone-300 p-3"
          />
          <textarea
            required
            placeholder="Full Address"
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
            className="w-full rounded-md border border-stone-300 p-3"
            rows={3}
          />
          <input
            required
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            className="w-full rounded-md border border-stone-300 p-3"
          />

          <div className="mt-4 border-t pt-4">
            <h2 className="mb-3 text-lg font-medium">Order Summary</h2>
            {lineItems.map((item) => (
              <div key={item.id} className="flex justify-between py-1 text-sm">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>
                  {formatMoney(Number.parseFloat(item.variant.price.amount) * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between py-1 text-sm">
              <span>Delivery Charge</span>
              <span>{formatMoney(deliveryCharge)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-stone-900 py-3 font-medium text-white transition hover:bg-stone-800"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === "payment" && (
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Complete Your Payment</h2>

          <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center">
            <p className="mb-2 text-sm text-stone-600">Send {formatMoney(total)} to:</p>
            <p className="mb-4 text-lg font-bold">
              {paymentMethod === "bkash" && "bKash"}
              {paymentMethod === "nagad" && "Nagad"}
              {paymentMethod === "rocket" && "Rocket"}
            </p>
            <p className="text-3xl font-bold tracking-widest text-rose-800">
              01572-909366
            </p>
          </div>

          <div className="flex gap-2">
            {["bkash", "nagad", "rocket"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition ${
                  paymentMethod === method
                    ? "border-rose-700 bg-rose-700 text-white"
                    : "border-stone-300 text-stone-600"
                }`}
              >
                {method === "bkash" ? "bKash" : method === "nagad" ? "Nagad" : "Rocket"}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Enter Transaction ID from SMS
            </label>
            <input
              required
              type="text"
              placeholder="e.g. TXN123ABC"
              value={trxID}
              onChange={(event) => setTrxID(event.target.value)}
              className="w-full rounded-md border border-stone-300 p-3"
            />
          </div>

          <div className="rounded-md bg-stone-50 p-3 text-sm text-stone-500">
            <p className="mb-1 font-medium">Important:</p>
            <p>
              After payment, enter the transaction ID you received via SMS. We will
              verify and confirm your order within 12 hours.
            </p>
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={!trxID}
            className={`w-full rounded-lg py-3 font-medium transition ${
              trxID
                ? "bg-green-700 text-white hover:bg-green-800"
                : "cursor-not-allowed bg-stone-300 text-stone-500"
            }`}
          >
            Confirm Payment & Place Order
          </button>
        </div>
      )}

      {step === "done" && (
        <div className="space-y-4 py-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-xl font-bold text-green-700">OK</span>
          </div>
          <h2 className="font-display text-2xl">Order Placed!</h2>
          <p className="text-stone-600">
            Thank you, {form.name}. We will verify your payment (TrxID: {trxID})
            and contact you at {form.phone} within 12 hours.
          </p>
          <a
            href="/"
            className="mt-4 inline-block rounded-md bg-stone-900 px-6 py-2 text-white"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}
