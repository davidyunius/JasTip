'use strict';
module.exports = (sequelize, DataTypes) => {
  var Destination = sequelize.define('Destination', {
    location: DataTypes.STRING,
    departure: DataTypes.DATE,
    arrival: DataTypes.DATE
  }, {});
  Destination.associate = function(models) {
    Destination.belongsToMany(models.User,{through:'Trip',foreignKey:'destinationId'})
  };
  return Destination;
};
