import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authrouter from './routes/Authroutes.js';
import patientrouter from './routes/Patientroutes.js';
import formrouter from './routes/AuthFormroutes.js';

dotenv.config();  // Load environment variables

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS setup to allow cross-origin requests
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Route middlewares
app.use('/api/auth', authrouter);
app.use('/api/', patientrouter);
app.use('/api/', formrouter);

// Error handling middleware for better debugging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Set server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
