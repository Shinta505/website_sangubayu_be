import StrukturOrganisasi from "../models/StrukturOrganisasiModel.js";
import multer from 'multer';
import path from 'path';

// Konfigurasi Multer untuk foto pejabat
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET all Struktur Organisasi
async function getAllStrukturOrganisasi(req, res) {
    try {
        const strukturOrganisasi = await StrukturOrganisasi.findAll();
        res.status(200).json(strukturOrganisasi);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// GET Struktur Organisasi by ID
async function getStrukturOrganisasiById(req, res) {
    const id_struktur = req.params.id_struktur;
    try {
        const strukturOrganisasi = await StrukturOrganisasi.findOne({ where: { id_struktur: id_struktur } });
        if (strukturOrganisasi) {
            res.status(200).json(strukturOrganisasi);
        } else {
            res.status(404).json({ message: 'Struktur Organisasi not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE Struktur Organisasi
async function createStrukturOrganisasi(req, res) {
    try {
        const { nama_jabatan, nama_pejabat } = req.body;
        const foto_pejabat = req.file ? req.file.filename : null;
        await StrukturOrganisasi.create({ nama_jabatan, nama_pejabat, foto_pejabat });
        res.status(201).json({ message: 'Struktur Organisasi created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// UPDATE Struktur Organisasi
async function updateStrukturOrganisasi(req, res) {
    try {
        const { nama_jabatan, nama_pejabat } = req.body;
        const foto_pejabat = req.file ? req.file.filename : req.body.foto_pejabat;
        await StrukturOrganisasi.update({ nama_jabatan, nama_pejabat, foto_pejabat }, {
            where: { id_struktur: req.params.id_struktur }
        });
        res.status(200).json({ message: 'Struktur Organisasi updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// DELETE Struktur Organisasi
async function deleteStrukturOrganisasi(req, res) {
    try {
        const id_struktur = req.params.id_struktur;
        const strukturOrganisasi = await StrukturOrganisasi.findOne({ where: { id_struktur: id_struktur } });

        if (!strukturOrganisasi) {
            return res.status(404).json({ message: 'Struktur Organisasi not found' });
        }

        await StrukturOrganisasi.destroy({
            where: { id_struktur: id_struktur }
        });
        res.status(200).json({ message: 'Struktur Organisasi deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export {
    getAllStrukturOrganisasi,
    getStrukturOrganisasiById,
    createStrukturOrganisasi,
    updateStrukturOrganisasi,
    deleteStrukturOrganisasi,
    upload
}