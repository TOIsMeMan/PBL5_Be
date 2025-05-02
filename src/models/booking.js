'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasMany(models.BookingSeat, {
        foreignKey: 'bookingId',
        as: 'bookingSeat'
      });
      
    }
  }
  Booking.init({
    userId: DataTypes.INTEGER,
    scheduleId: DataTypes.INTEGER,
    reference: DataTypes.STRING,
    booking_status: DataTypes.STRING,
    totalAmount: DataTypes.INTEGER,
    payment_status: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    payment_url: DataTypes.STRING,
    expires_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  
  return Booking;
};