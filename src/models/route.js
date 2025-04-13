'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.belongsTo(models.Role, {foreignKey: 'role_code', targetKey: 'code', as: 'roleData'})
    }
  }
  Route.init({
    fromLocationId: DataTypes.STRING,
    toLocationId: DataTypes.STRING,
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