import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necessary for Vercel Postgres/Heroku
    }
  },
  logging: false // Optional: set to console.log to see SQL queries
});

export default db;