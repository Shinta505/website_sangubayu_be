import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import StrukturOrganisasiRoute from './routes/StrukturOrganisasiRoute.js';
import UmkmRoute from './routes/UmkmRoute.js';
import ProdukRoute from './routes/ProdukRoute.js';

// Konfigurasi __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Atur view engine ke EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk menampilkan dokumentasi API
app.get('/', (req, res) => {
    res.render('index');
});

// Routes API
app.use('/api', StrukturOrganisasiRoute);
app.use('/api', UmkmRoute);
app.use('/api', ProdukRoute);

// Middleware untuk menangani 404 Not Found
app.use((req, res, next) => {
    res.status(404).render('error', { status: 404, message: 'Halaman tidak ditemukan' });
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { status: 500, message: 'Terjadi kesalahan pada server' });
});

// Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
