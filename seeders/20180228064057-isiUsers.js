'use strict';
const faker = require ('faker')
let arr = []
for(let i = 0;i<15;i++){
  let obj = {
    name: faker.name.firstName(),
    email : faker.internet.email(),
    phone : faker.phone.phoneNumber(),
    role : 1,
    status : 0,
    password : faker.name.firstName(),
    createdAt : new Date(),
    updatedAt : new Date()
  }
  arr.push(obj)
}
// console.log(arr);
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
    return queryInterface.bulkInsert('Users',arr, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
