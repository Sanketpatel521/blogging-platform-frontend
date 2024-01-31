export interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

export interface LoginForm { email: string; password: string }

export interface LoginFormErrors {
  email?: string;
  password?: string;
}
