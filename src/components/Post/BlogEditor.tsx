import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { validateContent, validateTitel } from "../../utils/validator";
import { usePostStore } from "../../store/post/PostStore";
import { useUserStore } from "../../store/user/UserStore";
import { useNavigate } from "react-router-dom";

interface BlogEditorProps {
  initialContent?: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<{
    title: undefined | string;
    content: undefined | string;
  }>({ title: undefined, content: undefined });
  const { addPost } = usePostStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (initialContent) {
      const contentState = ContentState.createFromBlockArray(
        JSON.parse(initialContent),
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialContent]);

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
      if (
        await addPost({ title: title, content: JSON.stringify(contentRaw) })
      ) {
        setTitle("");
        setEditorState(EditorState.createEmpty());
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
        Create Post
      </Button>
    </Box>
  );
};

export default BlogEditor;
