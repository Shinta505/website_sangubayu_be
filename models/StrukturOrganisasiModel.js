import { DataTypes, Sequelize } from 'sequelize';
import dbContext from '../config/Database.js';

const StrukturOrganisasi = dbContext.define('struktur_organisasi', {
    id_struktur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_jabatan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_pejabat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto_pejabat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'struktur_organisasi',
    freezeTableName: true,
    timestamps: false
});

export default StrukturOrganisasi;

(async () => {
    try {
        await dbContext.authenticate();
        console.log('Database connection has been established successfully.');
        await StrukturOrganisasi.sync(); // Akan membuat tabel jika belum ada
        console.log('Struktur Organisasi table has been synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
