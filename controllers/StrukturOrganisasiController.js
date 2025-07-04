import StrukturOrganisasi from "../models/StrukturOrganisasiModel.js";

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
        const inputResult = req.body;
        await StrukturOrganisasi.create(inputResult);
        res.status(201).json({ message: 'Struktur Organisasi created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// UPDATE Struktur Organisasi
async function updateStrukturOrganisasi(req, res) {
    try {
        await StrukturOrganisasi.update(req.body, {
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
    deleteStrukturOrganisasi
}
