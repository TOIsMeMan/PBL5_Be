'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schedule.init({
    routeId: DataTypes.STRING,
    departureTime: DataTypes.TIME,
    arrivalTime: DataTypes.TIME,
    date: DataTypes.DATEONLY,
    price: DataTypes.INTEGER,
    availableSeats: DataTypes.INTEGER,
    totalSeats: DataTypes.INTEGER,
    busType: DataTypes.STRING,
    status_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};