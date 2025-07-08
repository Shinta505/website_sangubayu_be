import axios from 'axios';
import querystring from 'querystring';

// Fungsi untuk menghitung biaya pengiriman
async function calculateCost(req, res) {
    const { origin, destination, weight, courier } = req.body;

    // Validasi input
    if (!origin || !destination || !weight || !courier) {
        return res.status(400).json({ msg: "Harap isi semua bidang yang diperlukan: origin, destination, weight, dan courier." });
    }

    try {
        const response = await axios.post('https://api.rajaongkir.com/starter/cost', querystring.stringify({
            origin,
            destination,
            weight,
            courier
        }), {
            headers: {
                key: process.env.RAJAONGKIR_API_KEY,
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error calculating shipping cost:", error.response ? error.response.data : error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server saat menghitung biaya pengiriman." });
    }
}

export {
    calculateCost
};