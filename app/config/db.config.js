
///practice push
const env = require('./production-env.js');

const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const sequelize = new Sequelize(env.database, env.db.username, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: env.dialect,
  dialectModule: mysql2,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

console.log("ENV.DATABASE: " + env.database);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Plant = require('../models/plant.model.js')(sequelize, Sequelize);
//db.HarvestedPlant = require('../models/harvestedPlant.model.js')(sequelize, Sequelize);
//db.HarvestBatch = require('../models/harvestBatch.model.js')(sequelize, Sequelize);
 
module.exports = db;
