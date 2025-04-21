'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingSeat.init({
    bookingId: DataTypes.INTEGER,
    seatId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BookingSeat',
  });
  return BookingSeat;
};