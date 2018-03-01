'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Agra',
      role: 1,
      status: 1,
      email: 'agroaarr@gmail.com',
      password: 'a9r4',
      phone: '081234567890',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        name: 'Gustaf Pahlevi',
        role: 2,
        status: 1,
        email: 'gustafvo@yahoo.com',
        password: 'gu5t4f',
        phone: '081212121212',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Kevin Himawan',
        role: 1,
        status: 1,
        email: 'kevin_aja@ymail.com',
        password: 'k3v1n',
        phone: '085298765432',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Agny Nuhreza',
        role: 2,
        status: 1,
        email: 'agny18plus@hotmail.com',
        password: '49ny',
        phone: '089876764545',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Deva',
        role: 1,
        status: 1,
        email: 'devdots@youtube.com',
        password: 'd3vd0t5',
        phone: '085678901234',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
