import { create } from 'zustand';

interface PostStoreState {
  posts: Array<{ id: string; title: string; content: string }>;
  addPost: (post: PostStoreState['posts'][0]) => void;
}

export const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
}));
