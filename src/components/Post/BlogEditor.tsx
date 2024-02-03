import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';

interface BlogEditorProps {
  initialContent?: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialContent }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({title:null, content:null});

  useEffect(() => {
    if (initialContent) {
      const contentState = ContentState.createFromBlockArray(
        JSON.parse(initialContent),
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialContent]);

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get the content from the editor
    const content = JSON.stringify(
      editorState.getCurrentContent().getBlockMap().map((block) => ({
        type: block?.getType(),
        data: block?.getData().toObject(),
        text: block?.getText(),
      })),
    );

    const postData = {
      title,
      content,
    };

    console.log(postData)
  };
  const toolbarStyle = {
    border: '1px solid #424242',
    borderRadius: '4px',
    padding: '8px',
    color: 'black',
    background: '#303030',
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ margin: 'auto' }}>
      <Typography  sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Title"
            name="title"
            variant="outlined"
            value={title}
            error={errors.title !== null}
            helperText={errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Content
      </Typography>
      <Paper elevation={2} sx={{ padding: 2, mt: 2 }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleChange}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'link',
              'emoji',
            ],
          }}
          toolbarStyle={toolbarStyle}
        />
      </Paper>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Create Post
      </Button>
    </Box>
  );
};

export default BlogEditor;
