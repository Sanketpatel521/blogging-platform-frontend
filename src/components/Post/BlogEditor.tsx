import React, { useState, useEffect } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { validateContent, validateTitel } from "../../utils/validator";
import { useUserStore } from "../../store/user/UserStore";
import { useNavigate, useParams } from "react-router-dom";
import { CreatePostData } from "../../types/post";
import { usePostStore } from "../../store/post/PostStore";

interface BlogEditorProps {
  onSubmit: (
    postData: CreatePostData,
    postid?: string,
  ) => Promise<boolean> | void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSubmit }) => {
  const { postId } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<{
    title: undefined | string;
    content: undefined | string;
  }>({ title: undefined, content: undefined });
  const { user } = useUserStore();
  const { posts } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      const post = posts.find((post) => post.postId === postId);
      if (!post) {
        return navigate("/post");
      }
      setTitle(post.title);
      const contentState = convertFromRaw(JSON.parse(post.content));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      navigate("/post");
    }
  }, [postId]);

  useEffect(() => {
    // If the user is not logged in, redirect to the login page to prevent unauthorized access to the create post functionality.
    if (!user) {
      navigate("/login");
    }
  });

  const handleContentChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    setErrors({ ...errors, content: validateContent(newEditorState) });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setErrors({ ...errors, title: validateTitel(value) });
    setTitle(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);

    const titelError = validateTitel(title);
    const contentError = validateContent(editorState);
    setErrors({ title: titelError, content: contentError });

    if (!errors.title && !errors.content) {
      const postData = { title, content: JSON.stringify(contentRaw) };
      if (postId) {
        await onSubmit(postData, postId);
      } else {
        if (await onSubmit(postData)) {
          setTitle("");
          setEditorState(EditorState.createEmpty());
        }
      }
    }
  };

  const toolbarStyle = {
    border: "1px solid #424242",
    borderRadius: "4px",
    padding: "8px",
    color: "black",
    background: "#303030",
  };

  return (
    <Box component="form" sx={{ margin: "auto" }}>
      <Typography sx={{ mt: 3 }}>
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          variant="outlined"
          value={title}
          error={!!errors.title}
          helperText={errors.title}
          onChange={handleTitleChange}
        />
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Content
      </Typography>
      <Paper elevation={2} sx={{ padding: 2, mt: 2 }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleContentChange}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "link",
              "emoji",
            ],
          }}
          toolbarStyle={toolbarStyle}
        />
      </Paper>
      {errors.content && (
        <Typography variant="body1" color="error.main" sx={{ mt: 1 }}>
          {errors.content}
        </Typography>
      )}

      <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 3 }}
      >
        {postId ? "Update Post" : "Create Post"}
      </Button>
    </Box>
  );
};

export default BlogEditor;
