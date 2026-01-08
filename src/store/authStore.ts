import { authAPI } from "@/lib/api";
import { create } from "zustand";

interface LoginCredentials {
  login: string;
  password: string;
  subdomain: string;
}

interface AuthStore {
  token: string | null;
  subdomain: string | null;
  isLoading: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
  setSubdomain: (subdomain: string) => void;
}

// --- Store ---
export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || null,
  subdomain: localStorage.getItem("subdomain") || null,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.login(credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("subdomain", credentials.subdomain);
      set({ token: token });
      return { success: true, message: "Kirish muvaffaqiyatli" };
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.response?.data?.message || "Kirishda xatolik yuz berdi!",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ token: null });
    localStorage.removeItem("token");
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setSubdomain: (subdomain) => {
    localStorage.setItem("subdomain", subdomain);
    set({ subdomain });
  },
}));
