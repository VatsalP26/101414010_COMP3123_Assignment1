const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

//Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

//MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 15000 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// starting the server on given port    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
