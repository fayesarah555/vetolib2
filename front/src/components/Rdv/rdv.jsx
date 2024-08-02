import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, Grid, Avatar, Box } from '@mui/material';
import { red, green } from '@mui/material/colors';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import './rdv.css'; // Import the CSS file

const rdvData = {
    upcoming: [
        {
            title: 'Consultation avec Dr. Smith',
            date: '2024-08-01',
            time: '10:00 AM',
            description: 'Bilan général pour Max.',
        },
        {
            title: 'Rendez-vous de vaccination',
            date: '2024-08-15',
            time: '02:00 PM',
            description: 'Vaccin contre la rage pour Bella.',
        },
    ],
    past: [
        {
            title: 'Visite de suivi',
            date: '2024-07-20',
            time: '11:00 AM',
            description: 'Consultation de suivi pour Luna.',
        },
        {
            title: 'Nettoyage dentaire',
            date: '2024-07-10',
            time: '09:00 AM',
            description: 'Nettoyage des dents pour Rocky.',
        },
    ],
};


const rdv = () => {
    return (
        <Box className="rdvContainer">
            <Typography variant="h4" className="rdvTitle">Rendez-vous à venir</Typography>
            <Grid container spacing={2}>
                {rdvData.upcoming.map((rdv, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card className="rdvCard upcoming">
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: green[500] }} aria-label="upcoming-rdv">
                                        {rdv.title.charAt(0)}
                                    </Avatar>
                                }
                                title={rdv.title}
                                subheader={`${rdv.date} à ${rdv.time}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {rdv.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h4" className="rdvTitle">Rendez-vous passés</Typography>
            <Grid container spacing={2}>
                {rdvData.past.map((rdv, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card className="rdvCard past">
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="past-rdv">
                                        {rdv.title.charAt(0)}
                                    </Avatar>
                                }
                                title={rdv.title}
                                subheader={`${rdv.date} à ${rdv.time}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {rdv.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <BottomNavBar />
        </Box>
    );
};

export default rdv;
