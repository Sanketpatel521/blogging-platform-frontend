import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import { useStore } from './store/index';
import UserMenu from './components/User/UserMenu';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const { userStore } = useStore();
  const { user, logout } = userStore;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Handle profile update logic here
    handleCloseMenu();
  };

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Blogging Platform</Typography>
            <div style={{ marginLeft: 'auto' }}>
              {user ? (
                <div>
                  <IconButton onClick={handleOpenMenu} color="inherit">
                    <Avatar>{user?.name.charAt(0).toUpperCase()}</Avatar>
                  </IconButton>
                  <UserMenu
                    anchorEl={anchorEl}
                    handleClose={handleCloseMenu}
                    handleProfile={handleProfile}
                    handleLogout={logout} user={null} />
                </div>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
