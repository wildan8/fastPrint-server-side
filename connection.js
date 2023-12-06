import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config()

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER,process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  });

  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  export default db;