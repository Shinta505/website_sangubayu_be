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
router.get('/', getAllStrukturOrganisasi);

// Route GET struktur organisasi berdasarkan ID
router.get('/:id_struktur', getStrukturOrganisasiById);

// Route POST tambah struktur organisasi baru
router.post('/', upload.single('foto_pejabat'), createStrukturOrganisasi);

// Route PUT update struktur organisasi
router.put('/:id_struktur', upload.single('foto_pejabat'), updateStrukturOrganisasi);

// Route DELETE hapus struktur organisasi
router.delete('/:id_struktur', deleteStrukturOrganisasi);

export default router;