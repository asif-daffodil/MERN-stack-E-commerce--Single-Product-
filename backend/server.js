const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded());
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/user');

const mongoConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if( !conn ) {
            throw new Error('MongoDB connection failed');
        }
        console.log('MongoDB connected successfully');

        // Ensure default admin user exists (dev-friendly bootstrap)
        const adminUsername = (process.env.ADMIN_USERNAME || 'admin').trim();
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
        const existingAdmin = await User.findOne({ username: adminUsername }).lean();
        if (!existingAdmin) {
            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await User.create({
                username: adminUsername,
                passwordHash,
                role: 'admin',
            });
            console.log(`Admin user created: ${adminUsername}`);
        }
    }catch (error) {
        console.error('MongoDB connection error:', error);  
        process.exit(1);
    }
};

mongoConnect();

const apiRoutes = require('./routes/api');
app.use(`/api/v${process.env.API_VERSION}`, apiRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


