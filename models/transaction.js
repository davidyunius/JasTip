'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    barang: DataTypes.TEXT,
    jumlahBarang: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Trip,{foreignKey:'tripId'})
  };
  return Transaction;
};
