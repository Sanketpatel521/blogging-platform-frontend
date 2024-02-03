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
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginForm from "./components/Auth/LoginForm";
import UserMenu from "./components/User/UserMenu";
import GenericForm from "./components/User/GenericForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/user/UserStore";
import { fetchUserDetails } from "./api/user";
import BlogEditor from "./components/Post/BlogEditor"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const { user, setUser, register, updateProfile, logout } = useUserStore();
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

  const handleProfile = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            Blogging Platform
          </Typography>
          <Button color="inherit" component={Link} to="/post">
            Create Post
          </Button>
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
                  handleLogout={logout}
                  user={null}
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
      <Container component="main" maxWidth="xs" >
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
          <Route
            path="/profile"
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
      <Container component="main" sx={{ marginTop: 4}} >
      <Routes>
      <Route
            path="/post"
            element={<BlogEditor />}
          />
        </Routes>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
