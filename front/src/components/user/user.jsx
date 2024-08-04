import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import axios from 'axios';

import './user.css';

const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
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

  const handleClick = () => {
    navigate('/detaille_Animal');
};


  return (
    <Box className="userDetailContainer">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card className="userCard">
            <CardMedia
              component="img"
              alt="User Avatar"
              height="140"
              image={userData.image || 'https://i.pinimg.com/564x/c1/d9/df/c1d9df923907435bf0bbc3e4a7e4ff89.jpg'}
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
              {/* <Grid container spacing={2} className="userInfo">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Address</Typography>
                  <Typography>{userData.address || 'Address not available'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Phone</Typography>
                  <Typography>{userData.phone || 'Phone not available'}</Typography>
                </Grid>
              </Grid> */}
            </CardContent>
          </Card>
        </Grid>
        {/* Add logic to display user's pets if any */}
        <Grid item xs={12} md={4} onClick={handleClick}>
          <Card className="petCard">
            {/* Example Pet Details */}
            <CardMedia
              component="img"
              alt="Pet Avatar"
              image={ 'https://tse4.mm.bing.net/th?id=OIP.XjXJn2amUEzgJKWOUHCtIQHaNn&pid=Api&P=0&h=180'}
              title="Pet Avatar"
              className="petAvatar"
              style={{ width: '140px', height: '180px',  borderRadius: '50%' }}
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