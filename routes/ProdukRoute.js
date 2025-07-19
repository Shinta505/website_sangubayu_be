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
router.get('/', getAllProduk);

// Route GET produk berdasarkan ID
router.get('/:id_produk', getProdukById);

// Route POST tambah produk baru
router.post('/', upload.single('gambar_produk'), createProduk);

// Route PUT update produk
router.put('/:id_produk', upload.single('gambar_produk'), updateProduk);

// Route DELETE hapus produk
router.delete('/:id_produk', deleteProduk);

export default router;