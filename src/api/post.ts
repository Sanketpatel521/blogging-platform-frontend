import axios from "axios";
import { CreatePostData, Post } from "../types/post";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/posts`;

export const createPost = async (
  formData: CreatePostData,
  token: string,
): Promise<Post> => {
  const response = await axios.post<Post>(BASE_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${BASE_URL}/latest`);
  return response.data;
};

export const deletePost = async (
  postId: string,
  token: string,
): Promise<void> => {
  await axios.delete(`${BASE_URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePost = async (
  postId: string | undefined,
  formData: Partial<CreatePostData>,
  token: string,
): Promise<Post> => {
  const response = await axios.put<Post>(`${BASE_URL}/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
