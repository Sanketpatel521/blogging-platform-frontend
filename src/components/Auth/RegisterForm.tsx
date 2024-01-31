import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useUserStore } from '../../store/user/UserStore';
import {RegisterFormErrors, User} from '../../types/user'
import { validateName, validateEmail, validatePassword, validatePhoneNumber } from '../../common/validator';



const RegisterForm: React.FC = () => {
  const { register } = useUserStore();
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate only the changed field
    const newErrors = { ...errors };
    switch (name) {
      case 'name':
        newErrors.name = validateName(value);
        break;
      case 'email':
        newErrors.email = validateEmail(value);
        break;
      case 'password':
        newErrors.password = validatePassword(value);
        break;
      case 'phoneNumber':
        newErrors.phoneNumber = validatePhoneNumber(value);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Perform validation on all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await register(formData);
    }
  };
  const validateForm = (data: User): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    errors.name = validateName(data.name);
    errors.email = validateEmail(data.email);
    errors.password = validatePassword(data.password);
    if (data.phoneNumber) {
      errors.phoneNumber = validatePhoneNumber(data.phoneNumber);
    }

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
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        name="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange}
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
        error={!!errors.password}
        helperText={errors.password}
      />

      <TextField
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
      />

      <TextField
      name="address"
        label="Address"
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
        rows={2}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
