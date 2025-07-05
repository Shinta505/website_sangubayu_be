import Produk from '../models/ProdukModel.js';
import Umkm from '../models/UmkmModel.js';
import { put } from '@vercel/blob';
import multer from 'multer';

// Konfigurasi Multer untuk memproses file di memori, bukan di disk
const upload = multer({ storage: multer.memoryStorage() });

// GET all Produk
async function getAllProduk(req, res) {
    try {
        const produk = await Produk.findAll({
            include: [{
                model: Umkm,
                attributes: ['nama_umkm', 'kontak_umkm']
            }]
        });
        res.status(200).json(produk);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// GET Produk by ID
async function getProdukById(req, res) {
    const id_produk = req.params.id_produk;
    try {
        const produk = await Produk.findOne({
            where: { id_produk: id_produk },
            include: { model: Umkm, attributes: ["nama_umkm", "kontak_umkm"] },
        });
        if (produk) {
            res.status(200).json(produk);
        } else {
            res.status(404).json({ message: 'Produk not found' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE
async function createProduk(req, res) {
    try {
        const {
            nama_produk,
            deskripsi_produk,
            harga_produk,
            stok_produk,
            id_umkm,
        } = req.body;

        // Validasi input
        if (!nama_produk || !deskripsi_produk || !harga_produk || !stok_produk || !id_umkm) {
            return res.status(400).json({ msg: "Harap isi semua bidang yang diperlukan." });
        }

        // Cek UMKM
        const umkm = await Umkm.findByPk(id_umkm);
        if (!umkm) {
            return res.status(404).json({ message: 'UMKM not found' });
        }

        let gambar_produk_url = null;
        if (req.file) {
            // Unggah file ke Vercel Blob
            const { url } = await put(
                `produk/${Date.now()}_${req.file.originalname}`,
                req.file.buffer,
                { access: 'public' }
            );
            gambar_produk_url = url;
        }

        // Buat produk baru dan simpan URL gambar
        await Produk.create({
            nama_produk,
            deskripsi_produk,
            harga_produk,
            stok_produk,
            gambar_produk: gambar_produk_url, // Simpan URL dari Vercel Blob
            id_umkm,
        });

        res.status(201).json({ message: 'Produk berhasil dibuat' });
    } catch (error) {
        console.log("Error creating produk:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}


// UPDATE
async function updateProduk(req, res) {
    try {
        const id_produk = req.params.id_produk;
        const {
            nama_produk,
            deskripsi_produk,
            harga_produk,
            stok_produk,
            id_umkm,
        } = req.body;

        // Cek UMKM
        const umkm = await Umkm.findByPk(id_umkm);
        if (!umkm) {
            return res.status(404).json({ message: 'UMKM not found' });
        }

        let gambar_produk_url = req.body.gambar_produk; // Default ke URL yang ada
        if (req.file) {
            // Jika ada file baru, unggah ke Vercel Blob
            const { url } = await put(
                `produk/${Date.now()}_${req.file.originalname}`,
                req.file.buffer,
                { access: 'public' }
            );
            gambar_produk_url = url;
        }

        await Produk.update({
            nama_produk,
            deskripsi_produk,
            harga_produk,
            stok_produk,
            gambar_produk: gambar_produk_url, // Simpan URL baru atau yang lama
            id_umkm,
        }, {
            where: { id_produk: id_produk }
        });
        res.status(200).json({ message: 'Produk berhasil diperbarui' });
    } catch (error) {
        console.log("Error updating produk:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// DELETE
async function deleteProduk(req, res) {
    try {
        const id_produk = req.params.id_produk;
        // Opsional: Anda bisa menambahkan logika untuk menghapus gambar dari Vercel Blob di sini
        await Produk.destroy({
            where: { id_produk: id_produk }
        });
        res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export {
    getAllProduk,
    getProdukById,
    createProduk,
    updateProduk,
    deleteProduk,
    upload
};