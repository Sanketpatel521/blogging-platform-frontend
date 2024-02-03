import { SetState, create } from "zustand";
import {
  LoginFormData,
  RegisterUserFormData,
  UpdateUserFormData,
  User,
} from "../../types/user";
import {
  fetchUserDetails,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../../api/user";
import { getErrorMessage } from "../../utils/error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface UserStoreState {
  user: User | null;
  setUser: (user: UserStoreState["user"]) => void;
  register: (
    formData: RegisterUserFormData | UpdateUserFormData,
  ) => Promise<void>;
  login: (formData: LoginFormData) => Promise<void>;
  logout: () => void;
  updateProfile: (
    formData: RegisterUserFormData | UpdateUserFormData,
  ) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  register: async (formData) => {
    try {
      const { token } = await registerUser(formData);
      await handleAuthSuccess(set, token);
      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error(
        getErrorMessage(error, "Registration failed. Please try again."),
      );
    }
  },

  login: async (formData) => {
    try {
      const { token } = await loginUser(formData);
      await handleAuthSuccess(set, token);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Login failed. Please try again."));
    }
  },
  logout: () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Reset user state
    set({ user: null });
  },

  updateProfile: async (formData) => {
    try {
      const currentUserDetails = useUserStore.getState().user;

      // Identify changed fields
      const updatedFields: Partial<UpdateUserFormData> = {};

      for (const key in formData) {
        if (
          formData[key as keyof typeof formData] !==
            currentUserDetails?.[key as keyof typeof currentUserDetails] &&
          formData[key as keyof typeof formData] &&
          formData[key as keyof typeof formData] !== ""
        ) {
          updatedFields[key as keyof typeof formData] =
            formData[key as keyof typeof formData];
        }
      }

      // Only update if there are changes
      if (Object.keys(updatedFields).length > 0) {
        const updatedUserDetails = await updateUserProfile(
          updatedFields,
          localStorage.getItem("token") || "",
        );
        set({ user: updatedUserDetails });
      }
      toast.success("Profile update successful!");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Profile update failed. Please try again."),
      );
    }
  },
}));

const handleAuthSuccess = async (
  set: SetState<UserStoreState>,
  token: string,
) => {
  // Store the token in local storage
  localStorage.setItem("token", token);

  // Fetch user details using the token
  const userDetails = await fetchUserDetails(token);

  // Set the user state with the fetched details
  set({ user: userDetails });
};
