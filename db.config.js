const Sequelize = require("sequelize");
const dbName = 'test';
const dbUser = 'root';
const dbPassword = '2001';



const sequelize = new Sequelize(dbName, dbUser, dbPassword,
  
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

  const db = {}
  db.Sequelize = Sequelize
  db.sequelize = sequelize;


  ///Models - tables
  db.customers = require('./customer.model')(sequelize, Sequelize);

  
  module.exports =db;