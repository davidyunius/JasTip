'use strict';
const faker = require ('faker')
let arr = []
for(let i = 0;i<15;i++){
  let obj = {
    location: faker.name.firstName(),
    departure : faker.date.recent(),
    arrival : faker.date.future(),
    createdAt : new Date(),
    updatedAt : new Date()
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
    return queryInterface.bulkInsert('Destinations',arr,{});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete('Destinations', null, {});
  }
};
