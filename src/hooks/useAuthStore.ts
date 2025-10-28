import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  displayName: string;
  photoURL: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        
        login: (user: User, tokens: { accessToken: string; refreshToken: string }) => {
          set({
            user,
            isAuthenticated: true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        },
        
        logout: () => {
          set({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
          });
        },
        
        updateTokens: (tokens: { accessToken: string; refreshToken: string }) => {
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
