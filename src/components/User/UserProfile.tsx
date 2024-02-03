import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useUserStore } from "../../store/user/UserStore";
import { useNavigate } from "react-router-dom";

const UserDataView: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    maxWidth: 400,
    margin: "auto",
    marginTop: 16,
    padding: 8,
  };

  const avatarStyle: React.CSSProperties = {
    width: 100,
    height: 100,
    margin: "auto",
    backgroundColor: "#3f51b5",
  };

  const dividerStyle: React.CSSProperties = {
    margin: "8px 0",
  };

  const buttonStyle: React.CSSProperties = {
    display: "block",
    margin: "auto",
    backgroundColor: "red",
    color: "white",
  };

  const {user, deleteProfile} = useUserStore()
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in, redirect to the login page to prevent unauthorized access to the view profile functionality.
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Card style={cardStyle}>
      <Avatar style={avatarStyle}>
        <AccountCircleIcon />
      </Avatar>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {user!.name}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={user!.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={user!.phoneNumber} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={user!.address} />
          </ListItem>
        </List>
        <Divider style={dividerStyle} />
      </CardContent>
      <Button onClick={deleteProfile} style={buttonStyle}>
        Delete User
      </Button>
    </Card>
  );
};

export default UserDataView;
