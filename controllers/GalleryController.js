import Gallery from '../models/GalleryModel.js';
import { put, del } from '@vercel/blob';
import multer from 'multer';

// Konfigurasi Multer untuk memproses file di memori
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all galleries
async function getAllGalleries(req, res) {
    try {
        const galleries = await Gallery.findAll();
        res.status(200).json(galleries);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// GET gallery by ID
async function getGalleryById(req, res) {
    const id_gallery = req.params.id_gallery;
    try {
        const gallery = await Gallery.findOne({ where: { id_gallery: id_gallery } });
        if (gallery) {
            res.status(200).json(gallery);
        } else {
            res.status(404).json({ message: 'Gallery tidak ditemukan' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE gallery
async function createGallery(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "Tidak ada file gambar yang diunggah" });
        }

        // Upload gambar ke Vercel Blob
        const blob = await put(req.file.originalname, req.file.buffer, {
            access: 'public',
        });

        // Simpan data beserta URL gambar ke database
        const inputResult = {
            ...req.body,
            url_gambar: blob.url // Asumsi kolom di database bernama 'url_gambar'
        };

        await Gallery.create(inputResult);
        res.status(201).json({ message: 'Gallery berhasil dibuat' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// UPDATE gallery
async function updateGallery(req, res) {
    try {
        const gallery = await Gallery.findOne({
            where: { id_gallery: req.params.id_gallery }
        });

        if (!gallery) {
            return res.status(404).json({ message: 'Gallery tidak ditemukan' });
        }

        let url_gambar = gallery.url_gambar; // Simpan URL gambar yang lama

        // Jika ada file baru yang diunggah
        if (req.file) {
            // Hapus gambar lama dari Vercel Blob jika ada
            if (gallery.url_gambar) {
                await del(gallery.url_gambar);
            }
            // Unggah gambar baru
            const blob = await put(req.file.originalname, req.file.buffer, {
                access: 'public',
            });
            url_gambar = blob.url; // Gunakan URL gambar yang baru
        }

        const updateData = {
            ...req.body,
            url_gambar: url_gambar
        };

        await Gallery.update(updateData, {
            where: { id_gallery: req.params.id_gallery }
        });

        res.status(200).json({ message: 'Gallery berhasil diperbarui' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// DELETE gallery
async function deleteGallery(req, res) {
    try {
        const id_gallery = req.params.id_gallery;
        const gallery = await Gallery.findOne({ where: { id_gallery: id_gallery } });

        if (!gallery) {
            return res.status(404).json({ message: 'Gallery tidak ditemukan' });
        }

        // Hapus gambar dari Vercel Blob jika URL-nya ada
        if (gallery.url_gambar) {
            await del(gallery.url_gambar);
        }

        // Hapus data dari database
        await Gallery.destroy({
            where: { id_gallery: id_gallery }
        });

        res.status(200).json({ message: 'Gallery berhasil dihapus' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export {
    getAllGalleries,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery,
    upload
};