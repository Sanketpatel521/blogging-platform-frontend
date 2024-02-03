import { create } from "zustand";
import { CreatePostData, Post } from "../../types/post";
import { toast } from "react-toastify";
import { createPost } from "../../api/post";
import { getErrorMessage } from "../../utils/error";

interface PostStoreState {
  posts: Array<Post>;
  addPost: (post: CreatePostData) => Promise<boolean>;
}

export const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  addPost: async (post) => {
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
}));
