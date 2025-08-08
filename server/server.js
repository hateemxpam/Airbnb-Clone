const cors = require('cors');
require('dotenv').config();
const hostRoutes = require('./routes/host.routes');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true                // allow cookies if needed
}));
app.use(express.json());
app.use('/api/host', hostRoutes);
// Static serving of media
app.use('/media', express.static(path.join(__dirname, 'media')));

//Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});