export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: any;
}
