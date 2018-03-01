'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trip = sequelize.define('Trip', {
    userId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER
  }, {});
  Trip.associate = function(models) {
    Trip.hasMany(models.Transaction,{foreignKey:'tripId'})
    Trip.belongsTo(models.User,{foreignKey:'userId'})
    Trip.belongsTo(models.Destination,{foreignKey:'destinationId'})
  };
  return Trip;
};
