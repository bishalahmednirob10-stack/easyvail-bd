"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { addLineItems, createCheckout, getCheckout } from "@/lib/shopify";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [cartError, setCartError] = useState(null);

  const createNewCheckout = useCallback(async () => {
    try {
      const checkout = await createCheckout();

      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);
      setCartError(null);
      localStorage.setItem("checkoutId", checkout.id);

      return checkout;
    } catch (error) {
      setCartError(error.message);
      return null;
    }
  }, []);

  const refreshCheckout = useCallback(
    async (id) => {
      try {
        const checkout = await getCheckout(id);

        setLineItems(checkout.lineItems);
        setCheckoutUrl(checkout.webUrl);
        setCartError(null);
      } catch {
        localStorage.removeItem("checkoutId");
        createNewCheckout();
      }
    },
    [createNewCheckout],
  );

  useEffect(() => {
    const savedId = localStorage.getItem("checkoutId");

    if (savedId) {
      setCheckoutId(savedId);
      refreshCheckout(savedId);
    } else {
      createNewCheckout();
    }
  }, [createNewCheckout, refreshCheckout]);

  const addToCart = useCallback(async (variantId, quantity = 1) => {
    const checkout = checkoutId ? { id: checkoutId } : await createNewCheckout();

    if (!checkout?.id) return false;

    try {
      const updatedCheckout = await addLineItems(checkout.id, [{ variantId, quantity }]);

      setCheckoutId(updatedCheckout.id);
      setLineItems(updatedCheckout.lineItems);
      setCheckoutUrl(updatedCheckout.webUrl);
      setCartError(null);
      setCartOpen(true);
      return true;
    } catch (error) {
      setCartError(error.message);
      return false;
    }
  }, [checkoutId, createNewCheckout]);

  const itemCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = lineItems.reduce((sum, item) => {
    return sum + Number.parseFloat(item.variant.price.amount) * item.quantity;
  }, 0);

  const value = useMemo(
    () => ({
      cartOpen,
      setCartOpen,
      lineItems,
      checkoutUrl,
      itemCount,
      subtotal,
      cartError,
      addToCart,
    }),
    [addToCart, cartError, cartOpen, checkoutUrl, itemCount, lineItems, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
