import { DataTypes, Sequelize } from "sequelize";
import dbContext from "../config/Database.js";

const Gallery = dbContext.define(
    'gallery', {
    id_gallery: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_gambar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi_gambar: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    url_gambar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_upload: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
},
    {
        tableName: 'gallery',
        freezeTableName: true,
        timestamps: false
    }
);

(async () => {
    try {
        await dbContext.authenticate();
        console.log('Database connection has been established successfully.');
        await Gallery.sync();
        console.log('Gallery table has been synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default Gallery;