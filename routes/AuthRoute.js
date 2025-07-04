import express from "express";
import { loginAdmin } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginAdmin);

export default router;
