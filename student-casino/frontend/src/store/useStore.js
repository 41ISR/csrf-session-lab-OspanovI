import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

const useStore = create((set, get) => ({
  user: null,
  balance: 0,
  csrfToken: "",
  isLoading: false,
  error: null,

  fetchCsrfToken: async () => {
    try {
      const res = await axios.get("/api/csrf-token");
      set({ csrfToken: res.data.csrfToken });
    } catch (err) {
      console.error("Ошибка получения CSRF токена", err);
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/api/auth/check");
      set({ user: res.data.username, balance: res.data.balance, error: null });
    } catch (err) {
      set({ user: null, balance: 0 });
    } finally {
      set({ isLoading: false });
      await get().fetchCsrfToken();
    }
  },

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/signup", {
        username,
        email,
        password,
      });
      set({ user: res.data.username, balance: res.data.balance });
      await get().fetchCsrfToken();
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.error || "Ошибка регистрации" });
      return { success: false, error: err.response?.data?.error };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/login", { username, password });
      set({ user: res.data.username, balance: res.data.balance });
      await get().fetchCsrfToken();
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.error || "Ошибка входа" });
      return { success: false, error: err.response?.data?.error };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await axios.post("/api/logout");
    set({ user: null, balance: 0, csrfToken: "" });
  },

  setBalance: (newBalance) => set({ balance: newBalance }),

  clearError: () => set({ error: null }),
}));

export default useStore;
