import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData ={
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;}

  type loginInfo = {
    accessToken: string;
    refreshToken: string;
  }& UserData;


type AuthState ={
  accessToken: string;
  refreshToken: string;
  user: UserData ;
  _hasHydrated: boolean;
  setToken: (token: string, user: UserData) => void;
  setUser: (user: UserData) => void;
  setRefreshToken: (token:string ,refreshToken: string) => void;
  clearToken: () => void;
  setHydrated: (value: boolean) => void;
  setLoginInfo: (data:loginInfo) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      user: {} as UserData,
      setLoginInfo: (data) => set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,  
        }), 
      _hasHydrated: false,
      setUser: (user) => set({ user }),
      setToken: ( user) => set({  user }),
      clearToken: () => set({ token: undefined, user: {} as UserData }),
      setHydrated: (value) => set({ _hasHydrated: value }),
      setRefreshToken: (token, refreshToken) => set((state) => ({
        token,
        user: { ...state.user, refreshToken },
      })),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
