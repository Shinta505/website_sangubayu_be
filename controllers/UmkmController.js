import Umkm  from '../models/UmkmModel.js';

// GET
async function getAllUmkm(req, res) {
    try {
        const umkm = await Umkm.findAll();
        res.status(200).json(umkm);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// GET by ID
async function getUmkmById(req, res) {
    const id_umkm = req.params.id_umkm;
    try {
        const umkm = await Umkm.findOne({ where: { id_umkm: id_umkm } });
        if (umkm) {
            res.status(200).json(umkm);
        } else {
            res.status(404).json({ message: 'UMKM not found' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE
async function createUmkm(req, res) {
    try {
        const inputResult = req.body;
        await Umkm.create(inputResult);
        res.status(201).json({ message: 'UMKM created successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// UPDATE
async function updateUmkm(req, res) {
    try {
        await Umkm.update(req.body, {
            where: { id_umkm: req.params.id_umkm }
        });
        res.status(200).json({ message: 'UMKM updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// DELETE
async function  deleteUmkm(req, res) {
    try {
        await Produk.destroy({
            where: { id_umkm: req.params.id_umkm }
        });
        res.status(200).json({ message: 'UMKM deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export {
    getAllUmkm,
    getUmkmById,
    createUmkm,
    updateUmkm,
    deleteUmkm
};