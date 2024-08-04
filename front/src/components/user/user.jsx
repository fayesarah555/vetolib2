import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import axios from 'axios';
import './user.css';

const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="userDetailContainer">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card className="userCard">
            <CardMedia
              component="img"
              alt="User Avatar"
              height="140"
              image={userData.avatar || 'default-avatar-url'}
              title="User Avatar"
              className="userAvatar"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {userData.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>
              <Typography variant="body1" className="userBio">
                {userData.bio || 'Bio not available'}
              </Typography>
              <hr></hr>
              <Grid container spacing={2} className="userInfo">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Address</Typography>
                  <Typography>{userData.address || 'Address not available'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Phone</Typography>
                  <Typography>{userData.phone || 'Phone not available'}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Add logic to display user's pets if any */}
        <Grid item xs={12} md={4}>
          <Card className="petCard">
            {/* Example Pet Details */}
            <CardMedia
              component="img"
              alt="Pet Avatar"
              image="pet-avatar-url"
              title="Pet Avatar"
              className="petAvatar"
            />
            <CardContent>
              <Grid container spacing={2} className="petInfo">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Nom</Typography>
                  <Typography>Max</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Age</Typography>
                  <Typography>2 ans</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <BottomNavBar />
    </Box>
  );
};

export default User;