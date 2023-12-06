import {Sequelize} from "sequelize";
import db from "../connection.js";
import kategori from './kategori.js';
import status from './status.js';

const {DataTypes} = Sequelize;

const produks = db.define('produk',{
  id : {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  nama_produk: {
    type: DataTypes.STRING,
    allowNull: false
   },
  harga:  {
    type: DataTypes.INTEGER,
    allowNull: false
   }
});
produks.belongsTo(kategori, { foreignKey: 'kategori_id', as: 'kategori' });
produks.belongsTo(status, { foreignKey: 'status_id', as: 'status' });

export default produks;

(async()=>{
  await db.sync();
})();