const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Fix for querySrv ECONNREFUSED on some networks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Handle mongoose connection for serverless environment
let isConnected;

const connectDB = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }
    console.log('=> using new database connection');
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState;
};

// Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
    try {
        await connectDB();
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.get('/api', (req, res) => {
    res.send('Portfolio Backend is running');
});

module.exports = app;
