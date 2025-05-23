'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},

      name: {type: Sequelize.STRING},
      email: {type: Sequelize.STRING},
      phone: {type: Sequelize.STRING},
      scheduleId: {type: Sequelize.INTEGER},
      reference: {type: Sequelize.STRING},
      booking_status: {type: Sequelize.STRING, defaultValue: 'BKS1'},
      totalAmount: {type: Sequelize.INTEGER},
      payment_method: {type: Sequelize.STRING, defaultValue: 'PMM2'},
      payment_url: {type: Sequelize.STRING},
      expires_at: {type: Sequelize.DATE},

      createdAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};