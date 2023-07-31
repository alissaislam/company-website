'use strict';
const {
  Model
} = require('sequelize');
const Joi=require('joi')
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee,Project}) {
     this.belongsToMany(Employee,{through:'Employee_technology',foreignKey:'id_technology'})
     this.belongsToMany(Project,{through:'Project_technology',foreignKey:'id_technology'})
     
    }
    toJSON(){
      return {...this.get(),Project_technology:undefined}
    }
    static validateTechnology(technology){
      const Schema=Joi.object().keys({
          name:Joi.string().required().min(3).max(45),
      })
      return Schema.validate(technology);
  }

  static validateEditTechnology(technology){
    const Schema=Joi.object().keys({
        name:Joi.string().min(3).max(45),
    })
    return Schema.validate(technology);
}
toJSON(){
  return {...this.get(),Employee_technology:undefined}
}
  }
  Technology.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
          max:45,
          notEmpty : true
      }
  }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Technology',
  });
  return Technology;
};