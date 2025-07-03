import express from "express";
import {
    getAllUmkm,
    getUmkmById,
    createUmkm,
    updateUmkm,
    deleteUmkm,
} from "../controllers/UmkmController.js";

const router = express.Router();

// Route GET semua UMKM
router.get("/umkm", getAllUmkm);

// Route GET UMKM berdasarkan ID
router.get("/umkm/:id_umkm", getUmkmById);

// Route POST tambah UMKM
router.post("/umkm", createUmkm);

// Route PUT update UMKM
router.put("/umkm/:id_umkm", updateUmkm);

// Route DELETE hapus UMKM
router.delete("/umkm/:id_umkm", deleteUmkm);

export default router;