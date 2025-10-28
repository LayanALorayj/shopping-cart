import apiClient from './apiClient';

interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

class UserService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', {
      ...credentials,
      expiresInMins: credentials.expiresInMins || 30,
    });
  }

  async getProfile(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    return apiClient.post<{ token: string; refreshToken: string }>('/auth/refresh', {
      refreshToken,
      expiresInMins: 30,
    });
  }

  async logout(): Promise<void> {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}

export default new UserService();
