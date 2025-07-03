import express from 'express';
import dotenv from 'dotenv';
import UmkmRoute from './routes/UmkmRoute.js';
import ProdukRoute from './routes/ProdukRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/', UmkmRoute);
app.use('/api/', ProdukRoute);

// Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
