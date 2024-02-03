import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { EditorState, ContentState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";

interface PostProps {
  title: string;
  body: string; // Assuming body is in JSON format
  author: string;
}

const Post: React.FC<PostProps> = ({ title, body, author }) => {
  const [expanded, setExpanded] = useState(false);
  const contentState =
    body && isValidJson(body)
      ? convertFromRaw(JSON.parse(body))
      : ContentState.createFromText("");
  const initialEditorState = EditorState.createWithContent(contentState);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {expanded ? (
            <Editor
              readOnly
              toolbarHidden={true}
              editorState={initialEditorState}
            />
          ) : (
            `${contentState.getPlainText().split(" ").slice(0, 200).join(" ")}${contentState.getPlainText().length > 200 ? "..." : ""}`
          )}
        </Typography>
      </CardContent>
      {contentState.getPlainText().length > 200 && (
        <CardActions>
          <Button size="small" onClick={toggleExpand}>
            {expanded ? "Read Less" : "Read More"}
          </Button>
        </CardActions>
      )}
      <CardContent sx={{ borderTop: "1px solid #ccc", paddingTop: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Author: {author}
        </Typography>
      </CardContent>
    </Card>
  );
};

function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export default Post;
