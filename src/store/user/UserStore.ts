import {create} from 'zustand';
import axios from 'axios';
import { User, RegisterFormData } from '../../types/user';

export interface UserStoreState {
  user: User | null;
setUser: (user: UserStoreState['user']) => void;
register: (formData: RegisterFormData) => Promise<void>;
login: (formData: ) => Promise<void>;
logout: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    user: null,
  setUser: (user) => set({ user }),
  register: async (formData) => {
    try {
      // Make API request to register user
      //const response = await axios.post('/api/register', formData);

      set({ user: formData });
    } catch (error) {
      console.error('Registration failed', error);
    }
  },
  login: async (formData) => {
    try {
      // Make API request to login user
      //const response = await axios.post('/api/login', formData);

      // Update state with user data
      const user = {name: 'string',
        email: 'string@a.com',
        password: 'string',
        phoneNumber: 'string',
        address: 'string'}
      set({ user: user });
    } catch (error) {
      console.error('Login failed', error);
    }
  },
  logout: () => {
    // Implement logout logic
    set({ user: null });
  },
}));
