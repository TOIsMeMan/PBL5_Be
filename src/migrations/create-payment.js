'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},

      bookingId: {type: Sequelize.INTEGER},
      totalAmount: {type: Sequelize.INTEGER},
      reference: {type: Sequelize.STRING},
      status: {type: Sequelize.STRING, defaultValue: 'PMS1'},
      expires_at: {type: Sequelize.DATE},

      createdAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};