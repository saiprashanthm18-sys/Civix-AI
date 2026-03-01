const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // For serving images to frontend
}));
app.use(morgan('dev'));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/issues', issueRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'CIVIX AI API is Running' });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

module.exports = app;
