'use strict';
const {
  Model
} = require('sequelize');
const Joi=require('joi')
module.exports = (sequelize, DataTypes) => {
  class Employee_language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee,Language}) {
      
    }

    static validateEmployee_language(employee_language){
      const Schema=Joi.object().keys({
          id_employee:Joi.number().integer().required(),
          id_language:Joi.number().integer().required(),
      })
      return Schema.validate(employee_language);
  }
  toJSON(){
    return {...this.get()}
  }
  }
  Employee_language.init({
    id_language:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            max:45,
            notEmpty : true
        }
    },
    id_employee:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            max:45,
            notEmpty : true
        }
    }
}, {
    sequelize,
    tableName:'employees_languages',
    modelName: 'Employee_language',
    timestamps: false
  });
  return Employee_language;
};