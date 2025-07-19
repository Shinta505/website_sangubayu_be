import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import AuthRoute from './routes/AuthRoute.js';
import StrukturOrganisasiRoute from './routes/StrukturOrganisasiRoute.js';
import UmkmRoute from './routes/UmkmRoute.js';
import ProdukRoute from './routes/ProdukRoute.js';
import Gallery from './routes/GalleryRoute.js';

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
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Rute untuk menampilkan dokumentasi API
app.get('/', (req, res) => {
    res.render('index');
});

// Routes API
app.use('/api/login', AuthRoute);
app.use('/api/struktur-organisasi', StrukturOrganisasiRoute);
app.use('/api/umkm', UmkmRoute);
app.use('/api/produk', ProdukRoute);
app.use('/api/gallery', Gallery);

// Middleware untuk menangani 404 Not Found
app.use((req, res, next) => {
    res.status(404).render('error', { status: 404, message: 'Halaman tidak ditemukan' });
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { status: 500, message: 'Terjadi kesalahan pada server' });
});

// --- Endpoint untuk Sitemap Dinamis ---
app.get('/api/sitemap', async (req, res) => {
    const baseUrl = 'https://sangubanyuneberdaya.my.id';

    // 1. Daftar halaman statis yang Anda miliki
    const staticPages = [
        { loc: '/', changefreq: 'daily', priority: '1.0' },
        { loc: '/html/profil-desa.html', changefreq: 'monthly', priority: '0.8' },
        { loc: '/html/struktur-organisasi.html', changefreq: 'monthly', priority: '0.8' },
        { loc: '/html/gor-kwt.html', changefreq: 'monthly', priority: '0.8' },
        { loc: '/html/umkm.html', changefreq: 'weekly', priority: '0.9' },
        { loc: '/html/peta-desa.html', changefreq: 'monthly', priority: '0.7' },
        { loc: '/html/gallery.html', changefreq: 'weekly', priority: '0.9' }
    ];
    
    // 2. Buat konten XML
    const sitemap = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${staticPages.map(page => `
                <url>
                    <loc>${baseUrl}${page.loc}</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>${page.changefreq}</changefreq>
                    <priority>${page.priority}</priority>
                </url>
            `).join('')}
        </urlset>
    `;

    // 3. Sajikan sebagai file XML
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on port ${PORT}`);
});