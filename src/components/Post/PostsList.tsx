import React from "react";
import Post from "./Post";
import { usePostStore } from "../../store/post/PostStore";
import { Typography, Box } from "@mui/material";
import { auto } from "@popperjs/core";

const PostsList: React.FC = () => {
  const { posts } = usePostStore();

  return (
    <Box>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            body={post.content}
            author={post.author.name}
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
