import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, Zoom, Card, CardContent, IconButton, Button } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './detailCabinet.css';

export default function DetailCabinet() {
    const [cabinet, setCabinet] = useState({
        name: 'Cabinet Vétérinaire Animaux Heureux',
        email: 'contact@animauxheureux.com',
        bio: 'Nous offrons des soins vétérinaires de qualité pour vos compagnons à quatre pattes. Notre équipe expérimentée est dédiée à la santé et au bien-être de vos animaux.',
        address: '123 Rue des Animaux, 75000 Paris',
        phone: '+33 1 23 45 67 89'
    });
    
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <Box className="cabinet-detail-container">
            <Card className="cabinet-card">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {cabinet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {cabinet.email}
                    </Typography>
                    <Typography variant="body1" className="cabinet-bio">
                        {cabinet.bio}
                    </Typography>
                    <hr />
                    <Box sx={{ width: '100%', marginTop: 2 }}>
                        <IconButton onClick={handleChange} className="toggle-button">
                            {checked ? <ArrowDropUp /> : <ArrowDropDown />}
                        </IconButton>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Zoom in={checked}>
                                    <Paper elevation={4} sx={{ padding: 2 }}>
                                        <Typography variant="h6">Address</Typography>
                                        <Typography>{cabinet.address}</Typography>
                                    </Paper>
                                </Zoom>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
                                    <Paper elevation={4} sx={{ padding: 2 }}>
                                        <Typography variant="h6">Phone</Typography>
                                        <Typography>{cabinet.phone}</Typography>
                                    </Paper>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleBack} className="back-button">
                        Retour
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
