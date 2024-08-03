import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import BottomNavBar from '../BottomNavBar/BottomNavBar'; // Assurez-vous que vous avez ce composant
import './user.css';

const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721952000&semt=ais_user',
    bio: 'Amoureux des chien 🐶',
    address: '3 rue Bikini Bottom, Aqualand',
    phone: '0123456789',
};

const animaux = {
    avatar: 'https://img.freepik.com/photos-premium/chiot-golden-retriever-5-mois_191971-2982.jpg',
    nom: 'Max',
    age: '2 ans',
    race: 'Golden Retriever',
    poids: '30 kg',
    sexe: 'Mâle',
    sterilise: 'Oui',
};





const User = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/detaille_Animal');
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
                            image={user.avatar}
                            title="User Avatar"
                            className="userAvatar"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                            <Typography variant="body1" className="userBio">
                                {user.bio}
                            </Typography>
                            <hr></hr>
                        <Grid container spacing={2} className="userInfo">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">Address</Typography>
                                <Typography>{user.address}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">Phone</Typography>
                                <Typography>{user.phone}</Typography>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} md={4} >
                <Card className="petCard" onClick={handleClick}>
                        <CardMedia
                            component="img"
                            alt="Pet Avatar"
                            image={animaux.avatar}
                            title="Pet Avatar"
                            className="petAvatar"
                        />
                        <CardContent>
                            <Grid container spacing={2} className="petInfo">
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6">Nom</Typography>
                                    <Typography>{animaux.nom}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6">Age</Typography>
                                    <Typography>{animaux.age}</Typography>
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
