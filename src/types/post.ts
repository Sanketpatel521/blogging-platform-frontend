export interface Post {
  postId: string;
  title: string;
  content: string;
  author: {
    userId: string;
    name: string;
  };
  createdAt: Date;
}

export interface CreatePostData {
  title: string;
  content: string;
}
