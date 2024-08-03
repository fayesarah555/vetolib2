// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
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

  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          <PetsIcon className="pets-icon" />
          VetoLib
        </Typography>
        <Button color="inherit" component={Link} to="/HomePage">Home</Button>
        <Button color="inherit" component={Link} to="/services">Services</Button>
        <Button color="inherit" component={Link} to="/about">About Us</Button>
        <Button color="inherit" component={Link} to="/SignIn">Connexion</Button>
        <Button color="inherit" component={Link} to="/">Inscription</Button>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          component={Link} to="/User"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/home">Home</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/services">Services</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/about">About Us</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/contact">Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
