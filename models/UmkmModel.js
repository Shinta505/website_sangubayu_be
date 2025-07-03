import { DataTypes, Sequelize } from 'sequelize';
import dbContext from '../config/Database.js';

const Umkm = dbContext.define('umkm', {
    id_umkm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_umkm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pemilik_umkm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi_umkm: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    alamat_umkm: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    kontak_umkm: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    peta_umkm: {
        type: DataTypes.TEXT, // Gunakan TEXT untuk menampung kode iframe
        allowNull: true,
    },
}, {
    tableName: 'umkm',
    freezeTableName: true,
    timestamps: false
});

export default Umkm;

(async () => {
    try {
        await dbContext.authenticate();
        console.log('Database connection has been established successfully.');
        await Umkm.sync(); // Akan membuat tabel jika belum ada
        console.log('UMKM table has been synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
