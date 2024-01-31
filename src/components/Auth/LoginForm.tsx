import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useUserStore } from '../../store/user/UserStore';
import { validateEmail, validatePassword } from '../../common/validator';
import { Link } from 'react-router-dom';
import { LoginForm, LoginFormErrors } from '../../types/user';

const LoginForm: React.FC = () => {
  const { login } = useUserStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });

    const newErrors = { ...errors };
    if (name === 'email') {
      newErrors.email = validateEmail(value);
    } else if (name === 'password') {
      newErrors.password = validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      //await login(formData);
    }
  };

  const validateForm = (data: LoginForm): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    errors.email = validateEmail(data.email);
    errors.password = validatePassword(data.password);
    
    return errors;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        p: 4,
        mt: 8,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>

      <TextField
        label="Email"
        name="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange}
        placeholder="Enter your email address"
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange}
        placeholder="Enter your password"
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>

      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account? {' '}
        <Button variant="text" color="primary" component={Link} to="/register">
          Register
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
