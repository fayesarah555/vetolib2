import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

function DetailPage() {
  const veterinarian = {
    name: 'Dr. Sarah Dupont',
    specialty: 'Veterinary Surgeon',
    location: '123 Animal Care Street, Paris',
    phone: '+33 1 23 45 67 89',
    email: 'sarah.dupont@example.com',
    description: 'Dr. Sarah Dupont is an experienced veterinary surgeon specializing in small animals. She has over 10 years of experience in the field and is dedicated to providing the best care for your pets.',
    image: 'https://images.unsplash.com/photo-1555685812-4b7434b8b8d4', // Placeholder image, replace with a relevant image URL
  };

  const handleAppointmentClick = () => {
    alert('You clicked on "Prendre Rendez-vous"! This would lead to a booking page.');
    // Here you would normally navigate to a booking page or handle the appointment process
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f0f8ff', 
        padding: 2 
      }}
    >
      <Card sx={{ maxWidth: 600, borderRadius: 4, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={veterinarian.image}
          alt="Veterinarian"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" sx={{ color: '#3f51b5' }}>
            {veterinarian.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ marginBottom: 2 }}>
            {veterinarian.specialty}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Address:</strong> {veterinarian.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Phone:</strong> {veterinarian.phone}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Email:</strong> {veterinarian.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2, marginBottom: 3 }}>
            {veterinarian.description}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{
              backgroundColor: '#ff4081', 
              '&:hover': { backgroundColor: '#f50057' }, 
              padding: 1.5,
              fontSize: '16px',
              borderRadius: 2,
            }}
            onClick={handleAppointmentClick}
          >
            Prendre Rendez-vous
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DetailPage;
