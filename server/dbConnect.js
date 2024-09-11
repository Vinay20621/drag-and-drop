const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        const dbURI = process.env.MONGODB_URI; 
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = dbConnect;
