import { create } from "zustand";
import { CreatePostData, Post } from "../../types/post";
import { toast } from "react-toastify";
import { createPost, fetchPosts } from "../../api/post";
import { getErrorMessage } from "../../utils/error";

interface PostStoreState {
  posts: Array<Post>;
  createPost: (post: CreatePostData) => Promise<boolean>;
  fetchPosts: () => void;
}

export const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  createPost: async (post) => {
    try {
      const postData = await createPost(
        post,
        localStorage.getItem("token") || "",
      );
      set((state) => ({
        posts: [...state.posts, postData],
      }));
      toast.success("Post created successfully!");
      return true;
    } catch (error: any) {
      toast.error(
        getErrorMessage(error, "Failed to create post. Please try again."),
      );
      return false;
    }
  },
  fetchPosts: async () => {
    try {
      const postData = await fetchPosts();
      set((state) => ({
        posts: [...state.posts, ...postData],
      }));
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to fetch post."));
    }
  },
}));
