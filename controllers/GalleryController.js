import Gallery from '../models/GalleryModel.js';

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
            res.status(404).json({ message: 'Gallery not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE gallery
async function createGallery(req, res) {
    try {
        const inputResult = req.body;
        await Gallery.create(inputResult);
        res.status(201).json({ message: 'Gallery created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// UPDATE gallery
async function updateGallery(req, res) {
    try {
        await Gallery.update(req.body, {
            where: { id_gallery: req.params.id_gallery }
        });
        res.status(200).json({ message: 'Gallery updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// DELETE gallery
async function deleteGallery(req, res) {
    try {
        const id_gallery = req.params.id_gallery;
        const deleted = await Gallery.destroy({
            where: { id_gallery: id_gallery }
        });
        if (deleted) {
            res.status(200).json({ message: 'Gallery deleted successfully' });
        } else {
            res.status(404).json({ message: 'Gallery not found' });
        }
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
    deleteGallery
};