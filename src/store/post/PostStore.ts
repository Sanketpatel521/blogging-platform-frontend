import { create } from "zustand";
import { CreatePost } from "../../types/post";

interface PostStoreState {
  posts: Array<{ id: string; title: string; content: string }>;
  addPost: (post: CreatePost) => void;
}

export const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  addPost: (post) => {},
}));
