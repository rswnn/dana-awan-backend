'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(5)
      },
      name: {
        type: Sequelize.STRING(30)
      },
      username: {
        type: Sequelize.STRING(30)
      },
      password: {
        type: Sequelize.STRING(30)
      },
      phone_number: {
        type: Sequelize.STRING(13)
      },
      pin: {
        type: Sequelize.STRING(6)
      },
      cash: {
        type: Sequelize.INTEGER(9)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};