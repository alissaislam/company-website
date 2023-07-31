'use strict';
const {
  Model
} = require('sequelize');
const Joi = require('joi')
module.exports = (sequelize, DataTypes) => {
  class Pay_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project}) {
      // define association here
      this.hasMany(Project,{foreignKey:'id_pay_plan',as:'pay_plans'})
    }
    toJSON(){
      return {...this.get()}
    }
    static validatePay_plan = (body)=>{
      const Schema=Joi.object().keys({
        description:Joi.string().min(3).max(45).required(),
    })
    return Schema.validate(body);
    }
    static validateEditingPay_plan = (body)=>{
      const Schema=Joi.object().keys({
        description:Joi.string().min(3).max(45),
        pay_planId:Joi.number().integer().min(1).required(),
    })
    return Schema.validate(body);
    }
  }
  Pay_plan.init({
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Pay plan must have a description.'},
        notEmpty:{msg:'Description must not be empty.'}
      }
    }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Pay_plan',
  });
  return Pay_plan;
};