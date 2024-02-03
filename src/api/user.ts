import axios from "axios";
import {
  LoginFormData,
  AuthResponse,
  User,
  UpdateUserFormData,
} from "../types/user";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

export const registerUser = async (
  formData: User | UpdateUserFormData,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/register`,
    formData,
  );
  return response.data;
};

export const loginUser = async (
  formData: LoginFormData,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/login`,
    formData,
  );
  return response.data;
};

export const fetchUserDetails = async (token: string): Promise<User> => {
  const response = await axios.get<User>(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (
  userData: Partial<UpdateUserFormData>,
  token: string,
): Promise<User> => {
  const response = await axios.put<User>(`${BASE_URL}/update`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
