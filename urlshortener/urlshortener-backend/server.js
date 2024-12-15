const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
