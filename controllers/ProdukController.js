import { where } from 'sequelize';
import Produk from '../models/ProdukModel.js';
import Umkm from '../models/UmkmModel.js';

// GET
async function getAllProduk(req, res) {
    try {
        const produk = await Produk.findAll({
            include: [
                {
                    model: Umkm,
                    attributes: ['nama_umkm', 'kontak_umkm']
                }
            ]
        });
        res.status(200).json(produk);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// GET by ID
async function getProdukById(req, res) {
    const id_produk = req.params.id_produk;
    try {
        const produk = await Produk.findOne({ where: { id_produk: id_produk }, include: { model: Umkm, attributes: ["nama_umkm", "kontak_umkm"] }, });
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
            gambar_produk,
            id_umkm,
        } = req.body;

        // Validasi input
        if (!nama_produk || !deskripsi_produk || !harga_produk || !stok_produk || !id_umkm) {
            return res.status(400).json({ msg: "Harap isi semua bidang yang diperlukan." });
        }

        // Ambil data umkm
        const umkm = await Umkm.findByPk(id_umkm);
        if (!umkm) {
            return res.status(404).json({ message: 'UMKM not found' });
        }

        // Buat produk baru dengan relasi ke UMKM
        await Produk.create({
            nama_produk,
            deskripsi_produk,
            harga_produk,
            stok_produk,
            gambar_produk,
            id_umkm,
        });

        res.status(201).json({ message: 'Produk created successfully' });
    } catch (error) {
        console.log(error.message);
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
            gambar_produk,
            id_umkm,
        } = req.body;

        // Ambil data umkm
        const umkm = await Umkm.findByPk(id_umkm);
        if (!umkm) {
            return res.status(404).json({ message: 'UMKM not found' });
        }

        await Produk.update(req.body, {
            where: { id_produk: id_produk }
        });
        res.status(200).json({ message: 'Produk updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// DELETE
async function deleteProduk(req, res) {
    try {
        const id_produk = req.params.id_produk;
        await Produk.destroy({
            where: { id_produk: req.params.id_produk }
        });
        res.status(200).json({ message: 'Produk deleted successfully' });
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
    deleteProduk
};
