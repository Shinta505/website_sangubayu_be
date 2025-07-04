import express from 'express';
import {
    getAllStrukturOrganisasi,
    getStrukturOrganisasiById,
    createStrukturOrganisasi,
    updateStrukturOrganisasi,
    deleteStrukturOrganisasi,
    upload
} from '../controllers/StrukturOrganisasiController.js';

const router = express.Router();

// Route GET semua struktur organisasi
router.get('/struktur-organisasi', getAllStrukturOrganisasi);

// Route GET struktur organisasi berdasarkan ID
router.get('/struktur-organisasi/:id_struktur', getStrukturOrganisasiById);

// Route POST tambah struktur organisasi baru
router.post('/struktur-organisasi', upload.single('foto_pejabat'), createStrukturOrganisasi);

// Route PUT update struktur organisasi
router.put('/struktur-organisasi/:id_struktur', upload.single('foto_pejabat'), updateStrukturOrganisasi);

// Route DELETE hapus struktur organisasi
router.delete('/struktur-organisasi/:id_struktur', deleteStrukturOrganisasi);

export default router;