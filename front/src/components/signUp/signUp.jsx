import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
    const [role, setRole] = React.useState('');
    const [animalNames, setAnimalNames] = React.useState(['']);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            username: data.get('username'), // Added username
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            role: role,
        };

        try {
            // Send POST request to the backend for user registration
            const response = await axios.post('http://localhost:3000/users', userData);
            
            if (role === 'owner') {
                // Handle additional animal registration if role is 'owner'
                const animalData = animalNames
                    .filter(name => name) // Filter out empty names
                    .map(name => ({
                        owner_id: response.data.id, // Use the newly created user ID
                        name: name,
                        species: 'Unknown', // Default values or add additional fields
                        breed: 'Unknown',
                        date_of_birth: new Date().toISOString().slice(0, 10), // Default to today
                        gender: 'Unknown',
                        microchip_number: 'Unknown',
                    }));

                // Register animals
                await Promise.all(animalData.map(animal => axios.post('http://localhost:3000/animals/create', animal)));
            }

            // Redirect to another page after successful registration
            navigate('/home');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            // Optionally show an error message to the user
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleAnimalChange = (index, event) => {
        const newAnimalNames = [...animalNames];
        newAnimalNames[index] = event.target.value;
        setAnimalNames(newAnimalNames);

        if (index === animalNames.length - 1 && event.target.value) {
            setAnimalNames([...animalNames, '']);
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
                        S inscrire
                    </Typography>
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
                                    {animalNames.map((name, index) => (
                                        <Grid item xs={12} key={index}>
                                            <TextField
                                                fullWidth
                                                name={`animal-${index}`}
                                                label="Nom de votre animal de compagnie"
                                                type="text"
                                                value={name}
                                                onChange={(event) => handleAnimalChange(index, event)}
                                                autoComplete="animal-name"
                                            />
                                        </Grid>
                                    ))}
                                </>
                            )}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Je veux recevoir des inspirations, des promotions marketing et des mises à jour par e-mail."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {role === 'owner' ? "Suivant" : "S'inscrire"}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={"/SignIn"} variant="body2">
                                    Vous avez déjà un compte ? Se connecter
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

// Copyright component to display at the bottom
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Votre site web
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
