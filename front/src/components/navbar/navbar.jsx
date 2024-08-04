import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Détecter la largeur de l'écran
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const userId = localStorage.getItem('user_id');
  console.log('user ID',userId);
  
  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu} sx={{ display: isSmallScreen ? 'block' : 'none' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          <PetsIcon className="pets-icon" />
          VetoLib
        </Typography>
        {/* Afficher les boutons de menu uniquement sur les grands écrans */}
        {!isSmallScreen && (
          <div className="menu-items">
            <Button color="inherit" component={Link} to="/HomePage">Home</Button>
            <Button color="inherit" component={Link} to="/SignIn">Connexion</Button>
            <Button color="inherit" component={Link} to="/">Inscription</Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              component={Link} to={`/User/${userId}`} // Utilisation de template literals pour l'URL 
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
        )}
        {/* Menu déroulant pour les petits écrans */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ display: isSmallScreen ? 'block' : 'none' }}
        >
          <MenuItem onClick={handleClose} component={Link} to="/HomePage">Home</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/SignIn">Connexion</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/">Inscription</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={`/User/${userId}`}>Mon compte</MenuItem>

        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
