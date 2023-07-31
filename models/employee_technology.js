'use strict';
const {
  Model
} = require('sequelize');
const Joi=require('joi')
module.exports = (sequelize, DataTypes) => {
  class Employee_technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee,Technology}) {
     
    }

    static validateEmployee_technology(employee_technology){
      const Schema=Joi.object().keys({
          id_employee:Joi.number().integer().required(),
          id_technology:Joi.number().integer().required(),
      })
      return Schema.validate(employee_technology);
  }

  toJSON(){
    return {...this.get()}
  }
  }
  Employee_technology.init({
    id_technology:{
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
    modelName: 'Employee_technology',
    tableName:"employees_technologies",
    timestamps: false
  });
  return Employee_technology;
};