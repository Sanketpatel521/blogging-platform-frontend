import { useUserStore } from './user/UserStore';
import { usePostStore } from './post/PostStore';

// Combine multiple stores
export const useStore = () => ({
  userStore: useUserStore(),
  postStore: usePostStore(),
});
