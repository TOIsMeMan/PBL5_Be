'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},

      fromLocationId: {type: Sequelize.INTEGER},
      toLocationId: {type: Sequelize.INTEGER},
      distance: {type: Sequelize.INTEGER},
      duration: {type: Sequelize.INTEGER},
      description: {type: Sequelize.STRING},
      status_code: {type: Sequelize.STRING, defaultValue: 'S1'},

      createdAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
  }
};