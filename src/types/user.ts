export interface User {
  userId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

export interface RegisterUserFormData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface UpdateUserFormData {
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  oldPassword?: string;
}

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  phoneNumber?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}
