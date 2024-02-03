export interface Post {
    postId: string;
    title: string;
    content: string;
    author: {
        userId: string,
        name: string,
    };
}

export interface CreatePost {
    title: string;
    content: string;
}