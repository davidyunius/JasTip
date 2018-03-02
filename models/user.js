'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name must be filled !!'
        }
      }
    },
    role: DataTypes.STRING,
    status: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Format Email Salah !!'
        },
        notEmpty: {
          args: true,
          msg: 'Email must be filled !!',
        },
        isUnique: (value, next) => {
          User.findAll({
            where: {
              email: value,
              id: { [sequelize.Op.ne]: this.id }
            }
          }).then(user => {
            if (user.length === 0) {
              next()
            }else {
              next({message:'Email already used !!'})
            }
          }).catch(err => {
            next(err)
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 255],
          msg: 'Password at least 5 character !!'
        }
      }
    },
    phone: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  User.associate = function (models) {
    User.belongsToMany(models.Destination, { through: 'Trip', foreignKey: 'userId' })
  };
  return User;
};
