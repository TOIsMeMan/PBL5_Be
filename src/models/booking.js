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
        foreignKey: 'id',
        as: 'bookingSeats'
      });
      Booking.belongsTo(models.Schedule, {foreignKey: 'scheduleId', targetKey: 'id', as: 'scheduleData'});
    }
  }
  Booking.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    scheduleId: DataTypes.INTEGER,
    reference: DataTypes.STRING,
    booking_status: DataTypes.STRING,
    totalAmount: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    payment_url: DataTypes.STRING,
    expires_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  
  return Booking;
};