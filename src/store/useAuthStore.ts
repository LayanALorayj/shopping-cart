import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  gender?: string;
}

interface AuthState {
  token: string | null;
  user: UserData | null;
  _hasHydrated: boolean;
  setToken: (token: string, user: UserData) => void;
  clearToken: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      _hasHydrated: false,
      setToken: (token, user) => set({ token, user }),
      clearToken: () => set({ token: null, user: null }),
      setHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
