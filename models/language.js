'use strict';
const {
  Model
} = require('sequelize');
const Joi=require('joi')
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee}) {
      this.belongsToMany(Employee,{through:'Employee_language',foreignKey:'id_language'})
    }

    static validateLanguage(language){
      const Schema=Joi.object().keys({
          name:Joi.string().required().min(3).max(45),
      })
      return Schema.validate(language);
  }

  static validateEditLanguage(language){
    const Schema=Joi.object().keys({
        name:Joi.string().required().min(3).max(45),
    })
    return Schema.validate(language);
}
toJSON(){
  return {...this.get(),Employee_language:undefined}
}
  }
  Language.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
          notEmpty : true,
          max:45
      }
  }
  }, {
    sequelize,
    modelName: 'Language',
    timestamps: false
  });
  return Language;
};