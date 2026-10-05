import { create } from 'zustand';
import axios from 'axios';

const useAppointmentStore = create((set) => ({
  appointments: [],
  loading: false,
  error: null,

  fetchAppointments: async (token) => {
    set({ loading: true });
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/appointments', config);
      set({ appointments: data, loading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  createAppointment: async (appointmentData, token) => {
    set({ loading: true });
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post('/api/appointments', appointmentData, config);
      set((state) => ({ appointments: [...state.appointments, data], loading: false }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return false;
    }
  }
}));

export default useAppointmentStore;
