'use strict';
const faker = require ('faker')
let arr = []
for(let i = 0;i<15;i++){
  let obj = {
    userId: Math.ceil(Math.random()*15),
    tripId : Math.ceil(Math.random()*15),
    barang : faker.random.word(),
    jumlahBarang :Math.ceil(Math.random()*4),
    createdAt : new Date(),
    updatedAt : new Date(),
  }
  arr.push(obj)
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Transactions',arr,{});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
