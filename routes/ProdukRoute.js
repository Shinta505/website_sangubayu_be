import express from 'express';
import {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk
} from '../controllers/ProdukController.js';

const router = express.Router();

// Route GET semua produk
router.get('/produk', getAllProduk);

// Route GET produk berdasarkan ID
router.get('/produk/:id_produk', getProdukById);

// Route POST tambah produk baru
router.post('/produk', createProduk);

// Route PUT update produk
router.put('/produk/:id_produk', updateProduk);

// Route DELETE hapus produk
router.delete('/produk/:id_produk', deleteProduk);

export default router;
