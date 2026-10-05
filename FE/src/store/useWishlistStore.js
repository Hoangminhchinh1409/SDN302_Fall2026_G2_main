import { create } from 'zustand';
import axios from 'axios';

const useWishlistStore = create((set) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async (token) => {
    set({ loading: true });
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/users/wishlist', config);
      set({ wishlist: data, loading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  addToWishlist: async (productId, token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post('/api/users/wishlist', { productId }, config);
      set({ wishlist: data });
    } catch (error) {
      console.error(error);
    }
  },
  
  removeFromWishlist: async (productId, token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.delete(`/api/users/wishlist/${productId}`, config);
      set({ wishlist: data });
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useWishlistStore;
