import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { EditorState, ContentState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { useUserStore } from "../../store/user/UserStore";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import { usePostStore } from "../../store/post/PostStore";
import { useNavigate } from "react-router-dom";

interface PostProps {
  postId: string;
  title: string;
  body: string;
  author: {
    userId: string;
    name: string;
  };
}

const Post: React.FC<PostProps> = ({ postId, title, body, author }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const contentState =
    body && isValidJson(body)
      ? convertFromRaw(JSON.parse(body))
      : ContentState.createFromText("");
  const initialEditorState = EditorState.createWithContent(contentState);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const { user } = useUserStore();
  const { deletePost } = usePostStore();

  const isPostOwner =
    author?.userId !== undefined &&
    user?.userId !== undefined &&
    author?.userId === user?.userId;

  const handleDelete = async () => {
    await deletePost(postId);
    setDeleteModalOpen(false);
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {expanded || contentState.getPlainText().length <= 200 ? (
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
      <CardContent
        sx={{
          borderTop: "1px solid #ccc",
          paddingTop: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Author: {author?.name ?? "Unknown"}
        </Typography>
        {isPostOwner && (
          <div>
            <IconButton
              size="small"
              color="primary"
              onClick={handleEdit}
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteModalOpen(true)}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          </div>
        )}
      </CardContent>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={"this post"}
      />
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
