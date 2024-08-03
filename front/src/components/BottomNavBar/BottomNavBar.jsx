import React, { useEffect } from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavBar.css';

const BottomNavBar = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/user') {
            setValue(0);
        } else if (location.pathname === '/commentaire') {
            setValue(1);
        } else if (location.pathname === '/rdv') {
            setValue(2);
        }
    }, [location]);

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate('/user');
        } else if (newValue === 1) {
            navigate('/commentaire');
        } else if (newValue === 2) {
            navigate('/rdv');
        }
    };

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleNavigation}
            >

                <BottomNavigationAction label="Profil" icon={<AccountBoxIcon />} />
                <BottomNavigationAction label="Commentaire" icon={<CommentIcon />} />
                <BottomNavigationAction label="Rendez-vous" icon={<CalendarMonthIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export default BottomNavBar;
