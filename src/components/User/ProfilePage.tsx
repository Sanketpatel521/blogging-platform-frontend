import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useUserStore } from "../../store/user/UserStore";
import { User } from "../../types/user";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...user });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    if (user) {
      setUpdatedProfile({ ...user });
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset updated profile to the current user profile
    setUpdatedProfile({
      name: user!.name,
      email: user!.email,
      phoneNumber: user!.phoneNumber,
      address: user!.address,
    });
    setProfileErrors({});
  };

  const handleSave = async () => {
    // Validate the updated profile fields
    const validationErrors: Record<string, string> = {};
    // Implement your validation logic here

    if (Object.keys(validationErrors).length === 0) {
      try {
        //setUser(updatedProfile);
        setEditing(false);
      } catch (error) {
        console.error("Error updating user profile", error);
      }
    } else {
      setProfileErrors(validationErrors);
    }
  };

  const handleInputChange = (
    field: keyof typeof updatedProfile,
    value: string,
  ) => {
    setUpdatedProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 4 }}>
      <Typography variant="h4">My Profile</Typography>
      <form>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={updatedProfile.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          disabled={!editing}
          error={!!profileErrors.name}
          helperText={profileErrors.name}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={updatedProfile.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          disabled={!editing}
          error={!!profileErrors.email}
          helperText={profileErrors.email}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={updatedProfile.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          disabled={!editing}
          error={!!profileErrors.phoneNumber}
          helperText={profileErrors.phoneNumber}
        />
        <TextField
          label="Address"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={2}
          value={updatedProfile.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          disabled={!editing}
          error={!!profileErrors.address}
          helperText={profileErrors.address}
        />

        {!editing ? (
          <Button variant="outlined" onClick={handleEdit} sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ mt: 2, mr: 2 }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel} sx={{ mt: 2 }}>
              Cancel
            </Button>
          </>
        )}
      </form>
    </Box>
  );
};

export default ProfilePage;
