'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      // Route belongs to Location as fromLocation
      Route.belongsTo(models.Location, {
        foreignKey: 'fromLocationId',
        targetKey: 'id',
        as: 'fromLocation'
      });

      // Route belongs to Location as toLocation
      Route.belongsTo(models.Location, {
        foreignKey: 'toLocationId',
        targetKey: 'id',
        as: 'toLocation'
      });
    }
  }
  Route.init({
    fromLocationId: DataTypes.INTEGER,
    toLocationId: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};
