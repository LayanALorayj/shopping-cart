import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
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
            firstName: data.firstName,
            lastName: data.lastName,
            maidenName: data.maidenName,
            age: data.age,
            gender: data.gender,
            email: data.email,
            phone: data.phone,
            username: data.username,
            password: data.password,
            birthDate: data.birthDate,
            image: data.image,
            bloodGroup: data.bloodGroup,
            height: data.height,
            weight: data.weight,
            eyeColor: data.eyeColor,
            hair: data.hair,
            ip: data.ip,
            address: data.address,
            macAddress: data.macAddress,
            university: data.university,
            bank: data.bank,
            company: data.company,
            ein: data.ein,
            ssn: data.ssn,
            userAgent: data.userAgent,
            crypto: data.crypto,
            role: data.role,
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
