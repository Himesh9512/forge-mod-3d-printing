import Product from '@/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  returnTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((item) => item._id === product._id);
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1, totalPrice: product.price }],
            };
          }
        });
      },
      removeFromCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((item) => item._id === product._id);
          if (!existingProduct) return state;

          if (existingProduct.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * item.price }
                  : item
              ),
            };
          } else {
            return {
              cart: state.cart.filter((item) => item._id !== product._id),
            };
          }
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      returnTotalPrice: () => {
        return get().cart.reduce((acc, item) => acc + item.totalPrice, 0);
      },
    }),
    {
      name: 'cart-storage',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onRehydrateStorage: (state) => {
        console.log('hydration starts: Cart');

        // optional
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            console.log('hydration finished');
          }
        };
      },
    }
  )
);
