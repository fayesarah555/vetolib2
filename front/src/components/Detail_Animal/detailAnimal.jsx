import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import './detailAnimal.css';

const animaux = {
    avatar: 'https://img.freepik.com/photos-premium/chiot-golden-retriever-5-mois_191971-2982.jpg',
    nom: 'Max',
    age: '2 ans',
    race: 'Golden Retriever',
    poids: '30 kg',
    sexe: 'Mâle',
    sterilise: 'Oui',
};

const DetailAnimal = () => {
    return (
        <Box className="animalDetailContainer">
            <Card className="animalCard">
                <CardMedia
                    component="img"
                    alt="Pet Avatar"
                    image={animaux.avatar}
                    title="Pet Avatar"
                    className="animalAvatar"
                />
                <CardContent>
                    <Grid container spacing={2} className="animalInfo">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Nom</Typography>
                            <Typography>{animaux.nom}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Age</Typography>
                            <Typography>{animaux.age}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Race</Typography>
                            <Typography>{animaux.race}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Poids</Typography>
                            <Typography>{animaux.poids}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Sexe</Typography>
                            <Typography>{animaux.sexe}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Sterilisé</Typography>
                            <Typography>{animaux.sterilise}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                
            </Card>
            
        </Box>
    );
};

export default DetailAnimal;
