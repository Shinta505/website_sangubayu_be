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
router.get("/", getAllUmkm);

// Route GET UMKM berdasarkan ID
router.get("/:id_umkm", getUmkmById);

// Route POST tambah UMKM
router.post("/", createUmkm);

// Route PUT update UMKM
router.put("/:id_umkm", updateUmkm);

// Route DELETE hapus UMKM
router.delete("/:id_umkm", deleteUmkm);

export default router;