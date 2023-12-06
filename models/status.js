import {Sequelize} from "sequelize";
import db from "../connection.js";

const {DataTypes} = Sequelize;

const status = db.define('statuses',{

  nama_status: {
    type: DataTypes.STRING,
    allowNull: false
   }
});

export default status;

(async()=>{
  await db.sync();
})();