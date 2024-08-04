import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './homePage.css';

export default function HomePage() {
    const [expanded, setExpanded] = useState(false);
    const [vetData, setVetData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/users/role/veterinarian')
            .then(response => {
                setVetData(response.data);
                console.log(response.data); // This will contain the list of veterinarians
            })
            .catch(error => {
                console.error('Error fetching veterinarians:', error);
            });
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = () => {
        navigate('/detaille_Cabinet');
    };

    return (
        <>
            <Box
                className='Box'
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Rechercher un vétérinaire" variant="outlined" />
            </Box>
            <div className="homePage">
                <img src='https://www.monchat.ca/wp-content/uploads/2020/02/fond-decran-blanc-avec-un-chien-et-un-chat-derriere-une-affiche-blanche.jpg' alt="Chien" className="homeImage" />
                <Box className="textOverlay">
                    <Typography variant="h1" className="title">
                        Bienvenue sur VetoLib
                    </Typography>
                    <Typography variant="h2" className="subtitle">
                        Facilitez l'accès aux soins vétérinaires
                    </Typography>
                </Box>
                <Grid container spacing={2} className="homeContent">
                    <Grid item xs={12} className="section">
                        <Typography variant="h3">Notre Mission</Typography>
                        <Typography>
                            <strong>VetoLib</strong> a pour objectif de rendre les soins vétérinaires accessibles et simples pour tous les propriétaires d'animaux. Grâce à notre plateforme, vous pouvez facilement prendre rendez-vous avec des vétérinaires proches de chez vous et lire les avis laissés par d'autres utilisateurs.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className="section">
                        <Typography variant="h3">Services Offerts</Typography>
                        <ul>
                            <li>
                                <Typography>
                                    <strong>Prise de rendez-vous en ligne</strong> : Réservez facilement des consultations avec des vétérinaires de confiance. Voyez leurs disponibilités et choisissez le créneau qui vous convient le mieux.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    <strong>Avis des utilisateurs</strong> : Consultez les avis laissés par d'autres propriétaires d'animaux pour vous aider à choisir le meilleur cabinet vétérinaire.
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} className="section">
                        <Typography variant="h3">Pour les Vétérinaires</Typography>
                        <Typography>
                            Vous possédez un cabinet vétérinaire ? Rejoignez VetoLib pour gérer vos rendez-vous de manière efficace et attirer de nouveaux clients grâce aux avis positifs de vos patients.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className="section">
                        <Typography variant="h3">Nos Valeurs</Typography>
                        <Typography>
                            <strong>Accessibilité et Confiance</strong> : Nous croyons que chaque propriétaire d'animal mérite un accès facile et rapide aux soins vétérinaires. Nous nous engageons à créer une communauté de confiance où les avis des utilisateurs jouent un rôle clé dans l'amélioration des services.
                        </Typography>
                    </Grid>
                </Grid>e
            </div>
            {vetData.map(vet => (
                vet && (
                    <Card key={vet.vet_id} className="Card" onClick={handleClick}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className="Avatar">
                                    {(vet.first_name && vet.first_name.charAt(0)) || ''}{(vet.last_name && vet.last_name.charAt(0)) || ''}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={`${vet.first_name || ''} ${vet.last_name || ''}`}
                            subheader={vet.specialization || 'Specialization not provided'}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image="https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/actu/esperance-vie-chiens-chiot-golden-retriever.jpg"
                            alt="Vet"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {vet.role || 'Not provided'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Nom: {vet.username || 'Not provided'}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                className={`ExpandMore ${expanded ? 'expanded' : ''}`}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>About:</Typography>
                                <Typography paragraph>
                                    This veterinarian specializes in {vet.specialization || 'a variety of services'}. For more information, you can reach them at {vet.phone || 'their phone'} or visit them at {vet.clinic_address || 'their clinic'}.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                )
            ))}
        </>
    );
}
