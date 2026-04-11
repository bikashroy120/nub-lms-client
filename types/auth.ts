export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: any;
}

export interface IResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: any;
}
