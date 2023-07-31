'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project,Offer}) {
      // define association here
      // this.belongsToMany(Project,{thorugh:'Project_offer'})
      // this.belongsToMany(Offer,{through:'Project_offer'})
    }
  }
  Project_offer.init({
    
  }, {
    sequelize,
    timestamps:false,
    tableName:'projects_offers',
    modelName: 'Project_offer',
  });
  return Project_offer;
};