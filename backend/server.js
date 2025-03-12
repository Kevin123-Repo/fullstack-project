const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes')

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
  }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
