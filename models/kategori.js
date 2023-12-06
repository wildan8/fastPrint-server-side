import {Sequelize} from "sequelize";
import db from "../connection.js";

const {DataTypes} = Sequelize;

const kategoris = db.define('kategoris',{

  nama_kategori: {
    type: DataTypes.STRING,
    allowNull: false
   }
});

export default kategoris;

(async()=>{
  await db.sync();
})();