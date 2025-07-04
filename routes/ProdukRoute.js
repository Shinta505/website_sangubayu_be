import express from 'express';
import {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
  upload
} from '../controllers/ProdukController.js';

const router = express.Router();

// Route GET semua produk
router.get('/produk', getAllProduk);

// Route GET produk berdasarkan ID
router.get('/produk/:id_produk', getProdukById);

// Route POST tambah produk baru
router.post('/produk', upload.single('gambar_produk'), createProduk);

// Route PUT update produk
router.put('/produk/:id_produk', upload.single('gambar_produk'), updateProduk);

// Route DELETE hapus produk
router.delete('/produk/:id_produk', deleteProduk);

export default router;