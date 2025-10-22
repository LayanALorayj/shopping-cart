import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
};

type LoginInfo = {
  accessToken: string;
  refreshToken: string;
} & UserData;

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserData | null;
  _hasHydrated: boolean;
  setToken: (token: string, user: UserData) => void;
  setUserInfo: (user: UserData) => void;
  setRefreshToken: (token: string, refreshToken: string) => void;
  clearToken: () => void;
  setHydrated: (value: boolean) => void;
  setLoginInfo: (data: LoginInfo) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      _hasHydrated: false,

      setToken: (token, user) => set({ accessToken: token, user }),
      setUserInfo: (user) => set({ user }),
      setRefreshToken: (token, refreshToken) => set({ accessToken: token, refreshToken }),
      clearToken: () => set({ accessToken: null, refreshToken: null, user: null }),
      setHydrated: (value) => set({ _hasHydrated: value }),
      setLoginInfo: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image,
            gender: data.gender,
          },
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
