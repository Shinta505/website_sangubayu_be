import express from 'express';
import {
    getAllGalleries,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery,
    upload,
} from '../controllers/GalleryController.js';

const router = express.Router();

// Route GET semua galeri
router.get('/', getAllGalleries);

// Route GET galeri berdasarkan ID
router.get('/:id_gallery', getGalleryById);

// Route POST tambah galeri
router.post('/', upload.single('url_gambar'), createGallery);

// Route PUT update galeri
router.put('/:id_gallery', upload.single('url_gambar'), updateGallery);

// Route DELETE hapus galeri
router.delete('/:id_gallery', deleteGallery);

export default router;