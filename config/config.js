// {
//   "development": {
//   "username": "root",
//     "password":"rkb2c4eeg_88h$vk-41z21j9c2gzie80",
//     "database": "railway",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "url": "mysql://root:rkb2c4eeg_88h$vk-41z21j9c2gzie80@roundhouse.proxy.rlwy.net:49372/railway",
//     "port": "49372"
//   },

//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },

//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

const {Sequelize} = require("sequelize");


const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    dialect:'mysql',
    port:process.env.DB_PORT,
    host:process.env.DB_HOST
});

module.exports = sequelize