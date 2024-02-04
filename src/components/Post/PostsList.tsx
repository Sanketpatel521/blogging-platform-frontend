import React, { useEffect, useState } from "react";
import Post from "./Post";
import { usePostStore } from "../../store/post/PostStore";
import { Typography, Box, CircularProgress, Button } from "@mui/material";

const PostsList: React.FC = () => {
  const { posts, hasMore, page, fetchPosts } = usePostStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadMore = async () => {
    if (loading || error) {
      return;
    }
    setLoading(true);
    try {
      await fetchPosts(page);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore, error]);

  return (
    <Box>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post
              key={post.postId}
              title={post.title}
              body={post.content}
              author={post.author}
              postId={post.postId}
            />
          ))}
          {hasMore && (
            <Box sx={{ textAlign: "center", marginTop: 2, padding: 2 }}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={50} />
                </div>
              ) : (
                <Button variant="outlined" onClick={handleLoadMore}>
                  Load More
                </Button>
              )}
            </Box>
          )}
        </>
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
