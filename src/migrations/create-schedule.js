'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},

      name: {type: Sequelize.STRING},
      departureTime: {type: Sequelize.TIME},
      arrivalTime: {type: Sequelize.TIME},
      date: {type: Sequelize.DATEONLY},
      price: {type: Sequelize.INTEGER},
      availableSeats: {type: Sequelize.INTEGER},
      totalSeats: {type: Sequelize.INTEGER},
      busType: {type: Sequelize.STRING},
      status_code: {type: Sequelize.STRING},

      createdAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};