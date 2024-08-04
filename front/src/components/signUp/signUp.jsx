import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Petgif from '../../../public/chat.gif';

const defaultTheme = createTheme();

export default function SignUp() {
    const [role, setRole] = React.useState('');
    const [animalDetails, setAnimalDetails] = React.useState([{
        name: '',
        species: '',
        breed: '',
        date_of_birth: '',
        gender: '',
    }]);
    const [showAddAnimalButton, setShowAddAnimalButton] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            username: data.get('username'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            role: role,
        };

        try {
            const response = await axios.post('http://localhost:3000/users', userData);

            if (role === 'owner') {
                const validAnimalDetails = animalDetails.filter(animal => 
                    animal.name && animal.species && animal.gender // Ensures these fields are not empty
                );

                if (validAnimalDetails.length > 0) {
                    const animalData = validAnimalDetails.map(animal => ({
                        user_id: response.data.user_id, // User ID from registration response
                        name: animal.name,
                        species: animal.species,
                        breed: animal.breed,
                        date_of_birth: animal.date_of_birth,
                        gender: animal.gender,
                        microchip_number: 'Unknown', // Or any other default value
                    }));

                    await Promise.all(animalData.map(animal => axios.post('http://localhost:3000/animals/create', animal)));
                }
            }

            navigate('/user');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleAnimalChange = (index, field, value) => {
        const newAnimalDetails = [...animalDetails];
        newAnimalDetails[index][field] = value;
        setAnimalDetails(newAnimalDetails);

        // Check if the current form is filled
        const isCurrentFormFilled = Object.values(newAnimalDetails[index]).every(val => val !== '');
        // Show "Add Another Animal" button if the form is filled
        setShowAddAnimalButton(isCurrentFormFilled);
    };

    const handleAddAnimal = () => {
        if (animalDetails.every(animal => 
            Object.values(animal).every(val => val !== '')
        )) {
            setAnimalDetails([...animalDetails, { name: '', species: '', breed: '', date_of_birth: '', gender: '' }]);
            setShowAddAnimalButton(false); // Hide button until the new form is filled
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        S'inscrire
                    </Typography>
                    <img
                    src={Petgif}
                    alt="Pet Gif"
                    style={{ width: '300px', height: 'auto' }} // Ajustez les dimensions selon vos besoins
                    />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nom d'utilisateur"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Prénom"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Nom"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresse e-mail"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Rôle"
                                    value={role}
                                    onChange={handleRoleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Choisissez un rôle</option>
                                    <option value="owner">Propriétaire</option>
                                    <option value="veterinarian">Vétérinaire</option>
                                </TextField>
                            </Grid>
                            {role === 'owner' && (
                                <>
                                    {animalDetails.map((animal, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Nom de votre animal de compagnie"
                                                    value={animal.name}
                                                    onChange={(event) => handleAnimalChange(index, 'name', event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Espèce"
                                                    value={animal.species}
                                                    onChange={(event) => handleAnimalChange(index, 'species', event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Race"
                                                    value={animal.breed}
                                                    onChange={(event) => handleAnimalChange(index, 'breed', event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Date de naissance"
                                                    type="date"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={animal.date_of_birth}
                                                    onChange={(event) => handleAnimalChange(index, 'date_of_birth', event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    select
                                                    fullWidth
                                                    label="Genre"
                                                    value={animal.gender}
                                                    onChange={(event) => handleAnimalChange(index, 'gender', event.target.value)}
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    <option value="">Sélectionnez le genre</option>
                                                    <option value="male">Mâle</option>
                                                    <option value="female">Femelle</option>
                                                </TextField>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                    {showAddAnimalButton && (
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={handleAddAnimal}
                                            >
                                                Ajouter un autre animal
                                            </Button>
                                        </Grid>
                                    )}
                                </>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {role === 'owner' ? "Suivant" : "S'inscrire"}
                                </Button>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/SignIn" variant="body2">
                                        Vous avez déjà un compte ? Se connecter
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
