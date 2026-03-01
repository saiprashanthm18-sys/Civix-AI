const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/civix_ai';

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
        process.exit(1);
    }
};

// Start Server
const startServer = async () => {
    await connectDB();
    const server = app.listen(PORT, () => {
        console.log(`🚀 CIVIX AI Engine running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`);
        server.close(() => process.exit(1));
    });
};

startServer();
