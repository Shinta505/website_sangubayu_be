import express from 'express';
import {
    calculateCost
} from '../controllers/RajaOngkirController.js';

const router = express.Router();

// Route POST untuk menghitung biaya pengiriman
router.post('/shipping-cost', calculateCost);

export default router;