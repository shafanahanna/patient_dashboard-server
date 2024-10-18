import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authrouter from './routes/Authroutes.js';
import patientrouter from './routes/Patientroutes.js';
import formrouter from './routes/AuthFormroutes.js';

dotenv.config(); 

mongoose.connect(process.env.MONGODB_URI )
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); 

app.use('/api/auth', authrouter);
app.use('/api/', patientrouter);
app.use('/api/', formrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
