import StrukturOrganisasi from "../models/StrukturOrganisasiModel.js";
import { put } from '@vercel/blob';
import multer from 'multer';

// Konfigurasi Multer untuk memproses file di memori
const upload = multer({ storage: multer.memoryStorage() });

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
        let foto_pejabat_url = null;

        if (req.file) {
            const { url } = await put(
                `pejabat/${Date.now()}_${req.file.originalname}`,
                req.file.buffer,
                { access: 'public' }
            );
            foto_pejabat_url = url;
        }

        await StrukturOrganisasi.create({
            nama_jabatan,
            nama_pejabat,
            foto_pejabat: foto_pejabat_url // Simpan URL dari Vercel Blob
        });

        res.status(201).json({ message: 'Struktur Organisasi created successfully' });
    } catch (error) {
        console.error("Error creating struktur organisasi:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat membuat data" });
    }
}

// UPDATE Struktur Organisasi
async function updateStrukturOrganisasi(req, res) {
    try {
        const { nama_jabatan, nama_pejabat } = req.body;
        let foto_pejabat_url = req.body.foto_pejabat; // Default ke URL yang ada

        if (req.file) {
            const { url } = await put(
                `pejabat/${Date.now()}_${req.file.originalname}`,
                req.file.buffer,
                { access: 'public' }
            );
            foto_pejabat_url = url;
        }

        await StrukturOrganisasi.update({
            nama_jabatan,
            nama_pejabat,
            foto_pejabat: foto_pejabat_url
        }, {
            where: { id_struktur: req.params.id_struktur }
        });

        res.status(200).json({ message: 'Struktur Organisasi updated successfully' });
    } catch (error) {
        console.error("Error updating struktur organisasi:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui data" });
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