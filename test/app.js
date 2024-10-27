// app.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const leaveRoutes = require('./routes/leaveRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, // Allow credentials (cookies)
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/leave', leaveRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Serve frontend files if any (for SPA)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build')); // Adjust path based on frontend location
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
