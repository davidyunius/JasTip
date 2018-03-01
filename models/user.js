'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    role: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Destination,{through:'Trip',foreignKey:'userId'})
    User.hasMany(models.Transaction,{foreignKey:'userId'})
  };
  return User;
};
