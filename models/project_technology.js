'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project_technology.init({
    
  }, {
    sequelize,
    timestamps:false,
    tableName:'projects_technologies',
    modelName: 'Project_technology',
  });
  return Project_technology;
};