import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateOldPassword,
} from "../../common/validator";
import {
  RegisterUserFormData,
  RegisterFormErrors,
  UpdateUserFormData,
} from "../../types/user";
import { useUserStore } from "../../store/user/UserStore";

interface GenericFormProps {
  title: string;
  submitButtonText: string;
  onSubmit: (formData: RegisterUserFormData | UpdateUserFormData) => void;
  isUpdate?: boolean;
}

const GenericForm: React.FC<GenericFormProps> = ({
  title,
  submitButtonText,
  onSubmit,
  isUpdate = title === "Edit Profile",
}) => {
  const { user } = useUserStore();
  let initialValue;
  if (isUpdate) {
    initialValue = {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      oldPassword: "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
    };
  } else {
    initialValue = {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    };
  }
  const [formData, setFormData] = useState<
    RegisterUserFormData | UpdateUserFormData
  >(initialValue);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const newErrors = { ...errors };
    switch (name) {
      case "name":
        newErrors.name = validateName(value);
        break;
      case "email":
        newErrors.email = validateEmail(value);
        break;
      case "password":
        newErrors.password = validatePassword(value);
        break;
      case "oldPassword":
        newErrors.oldPassword = validateOldPassword(value);
        break;
      case "phoneNumber":
        newErrors.phoneNumber = validatePhoneNumber(value);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (!Object.values(validationErrors).some((error) => error !== undefined)) {
      await onSubmit(formData);
    }
  };

  const validateForm = (
    data: RegisterUserFormData | UpdateUserFormData,
  ): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    errors.name = validateName(data.name);
    errors.email = validateEmail(data.email);
    if (!isUpdate || data.password) {
      errors.password = validatePassword(data.password!);
    }
    if (
      isUpdate &&
      "oldPassword" in data &&
      data.password &&
      data.password !== ""
    ) {
      errors.oldPassword = validateOldPassword(data.oldPassword!);
    }
    if (data.phoneNumber) {
      errors.phoneNumber = validatePhoneNumber(data.phoneNumber);
    }

    return errors;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        p: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={formData.name}
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
        value={formData.email}
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
        fullWidth
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        required={!isUpdate}
      />

      {isUpdate && formData.password && formData.password !== "" && (
        <TextField
          name="oldPassword"
          label="Old Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleChange}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          required
        />
      )}

      <TextField
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.phoneNumber}
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
        value={formData.address}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleSubmit}
      >
        {submitButtonText}
      </Button>
    </Box>
  );
};

export default GenericForm;
