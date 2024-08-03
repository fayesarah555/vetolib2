import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CommentIcon from '@mui/icons-material/Comment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import './commentaire.css';

const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://pbs.twimg.com/media/GDVItWLW8AAe1k3.jpg:large', // Remplacez par une véritable URL d'image
    bio: "Propriétaire d'animaux aimant et voyageur passionné. Fier propriétaire de deux chiens et d'un chat.",
    address: '1234 Pet Street, Animal City, Petland',
    phone: '(123) 456-7890',
    reviews: [
        {
            title: 'Excellent vétérinaire',
            content: 'Le Dr Smith a pris grand soin de mon chien. Je recommande vivement !',
            date: '2024-07-30',
        },
        {
            title: 'Service excellent',
            content: 'La clinique était propre et le personnel était amical.',
            date: '2024-06-15',
        },
    ],
};

export default function Commentaire() {


    return (
        <>
            <div className="commentSection">
                <Grid container spacing={2}>
                    {user.reviews.map((review, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card className="reviewCard">
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="reviewer">
                                            {user.name.charAt(0)}
                                        </Avatar>
                                    }
                                    title={review.title}
                                    subheader={review.date}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <BottomNavBar />
        </>
    );
}
