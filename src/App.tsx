import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginForm from "./components/Auth/LoginForm";
import UserMenu from "./components/User/UserMenu";
import GenericForm from "./components/User/GenericForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/user/UserStore";
import { fetchUserDetails } from "./api/user";
import BlogEditor from "./components/Post/BlogEditor";
import { usePostStore } from "./store/post/PostStore";
import PostsList from "./components/Post/PostsList";
import UserProfile from "./components/User/UserProfile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const { user, setUser, register, updateProfile, logout } = useUserStore();
  const { createPost, updatePost } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      // Fetch user details using the token
      fetchUserDetails(token)
        .then((userDetails) => {
          setUser(userDetails);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
  }, [user, setUser, navigate]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileUpdate = () => {
    handleCloseMenu();
    navigate("/profile/update");
  };

  const handleProfile = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            Blogging Platform
          </Typography>
          {user && (
            <Button
              color="inherit"
              component={Link}
              to="/post"
              sx={{ marginLeft: 4 }}
            >
              Create Post
            </Button>
          )}

          <div style={{ marginLeft: "auto" }}>
            {user ? (
              <div>
                <IconButton onClick={handleOpenMenu} color="inherit">
                  <Avatar>{user?.name.charAt(0).toUpperCase()}</Avatar>
                </IconButton>
                <UserMenu
                  anchorEl={anchorEl}
                  handleClose={handleCloseMenu}
                  handleProfile={handleProfile}
                  handleProfileUpdate={handleProfileUpdate}
                  handleLogout={handleLogout}
                />
              </div>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Routes>
          <Route
            path="/register"
            element={
              <GenericForm
                title="Register"
                submitButtonText="Register"
                onSubmit={register}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/profile/update"
            element={
              <GenericForm
                title="Edit Profile"
                submitButtonText="Save Changes"
                onSubmit={updateProfile}
              />
            }
          />
        </Routes>
      </Container>
      <Container component="main" sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post" element={<BlogEditor onSubmit={createPost} />} />
          <Route
            path="/edit-post/:postId"
            element={<BlogEditor onSubmit={updatePost} />}
          />
        </Routes>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
