import React from "react";
import Post from "./Post";
import { usePostStore } from "../../store/post/PostStore";
import { Typography, Box } from "@mui/material";

const PostsList: React.FC = () => {
  const { posts } = usePostStore();

  return (
    <Box>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.postId}
            title={post.title}
            body={post.content}
            author={post.author}
            postId={post.postId}
          />
        ))
      ) : (
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          No posts available. Start creating some awesome content!
        </Typography>
      )}
    </Box>
  );
};

export default PostsList;
