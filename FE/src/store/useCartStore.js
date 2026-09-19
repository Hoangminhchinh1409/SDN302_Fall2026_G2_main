import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal',
      
      addToCart: (product, qty) => {
        const item = {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.stock,
          qty,
        };

        const existItem = get().cartItems.find((x) => x.product === item.product);

        if (existItem) {
          set({
            cartItems: get().cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((x) => x.product !== id),
        });
      },

      saveShippingAddress: (data) => {
        set({ shippingAddress: data });
      },

      savePaymentMethod: (data) => {
        set({ paymentMethod: data });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
