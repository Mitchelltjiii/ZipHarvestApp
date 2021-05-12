const env = {
    database: 'defaultdb',
    db: {
        username: 'doadmin',
        password: 'xo6wgtevue3qzrmw',
        host: 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
        port: '25060'
    },
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;