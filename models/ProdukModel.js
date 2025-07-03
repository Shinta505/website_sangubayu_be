import { DataTypes, Sequelize } from 'sequelize';
import dbContext from '../config/Database.js';
import Umkm from './UmkmModel.js';

const Produk = dbContext.define(
    'produk', {
    id_produk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_produk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi_produk: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    harga_produk: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stok_produk: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gambar_produk: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_umkm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Umkm,
            key: 'id_umkm'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
},
    {
        tableName: 'produk',
        freezeTableName: true,
        timestamps: false
    });

Produk.belongsTo(Umkm, {
    foreignKey: 'id_umkm'
});

export default Produk;

(async () => {
    try {
        await dbContext.authenticate();
        console.log('Database connection has been established successfully.');
        await Produk.sync();
        console.log('Produk table has been synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();