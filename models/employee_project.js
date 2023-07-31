'use strict';
const {
  Model
} = require('sequelize');
const Joi=require('joi')
module.exports = (sequelize, DataTypes) => {
  class Employee_project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee,Project}) {
     
    }

    static validateEmployee_project(employee_project){
      const Schema=Joi.object().keys({
          id_employee:Joi.number().integer().required(),
          id_project:Joi.number().integer().required(),
      })
      return Schema.validate(employee_project);
  }
  toJSON(){
    return {...this.get()}
  }
 
  }
  Employee_project.init({
    id_employee: DataTypes.STRING,
    id_project: DataTypes.STRING
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Employee_project',
    tableName:"employees_projects"
  });
  return Employee_project;
};