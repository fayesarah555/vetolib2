const express = require('express');

const usersRoute = require('./routes/users');
const ownersRoute = require('./routes/owners');
const animalsRoute = require('./routes/animals');
const veterinariansRoute = require('./routes/veterinarians');
const appointmentsRoute = require('./routes/appointments');
const medicalRecordsRoute = require('./routes/medicalRecords');
const medicationsRoute = require('./routes/medications');

const app = express();
app.use(express.json());

app.use('/users', usersRoute);
app.use('/owners', ownersRoute);
app.use('/animals', animalsRoute);
app.use('/veterinarians', veterinariansRoute);
app.use('/appointments', appointmentsRoute);
app.use('/medicalRecords', medicalRecordsRoute);
app.use('/medications', medicationsRoute);



app.listen(3000, () => {
  console.log(`API listening at http://localhost:${3000}`);
});
