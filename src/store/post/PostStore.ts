import { create } from "zustand";
import { CreatePostData, Post } from "../../types/post";
import { toast } from "react-toastify";
import { createPost, deletePost, fetchPosts, updatePost } from "../../api/post";
import { getErrorMessage } from "../../utils/error";

interface PostStoreState {
  posts: Array<Post>;
  createPost: (post: CreatePostData) => Promise<boolean>;
  fetchPosts: () => void;
  deletePost: (postId: string) => void;
  updatePost: (postData: CreatePostData, postid:string | undefined) => void;
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
  deletePost: async (postId) => {
    try {
      deletePost(postId, localStorage.getItem("token") || "");
      set((state) => ({
        posts: state.posts.filter((post) => post.postId !== postId),
      }));
      toast.success("Post deleted successfully!");
    } catch (error: any) {
      toast.error(
        getErrorMessage(error, "Post delete failed. Please try again."),
      );
    }
  },
  updatePost: async (postData,postId) => {
    try {
      const currentPosts = usePostStore.getState().posts;
      const currentPostIndex = currentPosts.findIndex((post) => post.postId === postId);
      // Identify changed fields
      const updatedFields: Partial<CreatePostData> = {};

      if (currentPostIndex === -1) {
        toast.error(`Post with postId ${postId} not found.`);
        return;
      }

      const currentPostDetails = currentPosts[currentPostIndex];

      for (const key in postData) {
        if (
          postData[key as keyof typeof postData] !==
          currentPostDetails?.[key as keyof typeof currentPostDetails]
        ) {
          updatedFields[key as keyof typeof postData] =
          postData[key as keyof typeof postData];
        }
      }

      // Only update if there are changes
      if (Object.keys(updatedFields).length > 0) {
        const updatedPost = await updatePost(postId,
          updatedFields,
          localStorage.getItem("token") || "",
        );
              // Update the state with the new post data
      set((state) => {
        const updatedPosts = [...state.posts];
        updatedPosts[currentPostIndex] = updatedPost;
        return { posts: updatedPosts };
      });
      }

      toast.success("Post updated successfully!");
    } catch (error: any) {
      toast.error(
        getErrorMessage(error, "Failed to update post. Please try again."),
      );
    }
  }
}));
