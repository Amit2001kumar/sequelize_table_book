
module.exports = (sequelize, Sequelize) =>{
    const customers = sequelize.define('customer',{
        title: {
            type: Sequelize.STRING,
            allowNull: false
          },
          author: {
            type: Sequelize.STRING,
            allowNull: false
          },
          release_date: {
            type: Sequelize.DATEONLY,
          },
          subject: {
            type: Sequelize.INTEGER,
          }
       });
       return customers;
}