'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi')



module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project}) {
      // define association here
      this.hasMany(Project,{foreignKey:'id_customer'})
    }
    toJSON(){
      return {...this.get(),photo:undefined}
    }
    static validateCustomer = (body)=>{
      const Schema=Joi.object().keys({
        first_name:Joi.string().required().min(3).max(45),
        last_name:Joi.string().required().min(3).max(45),
        phone:Joi.string().required().min(10).max(45),
        email:Joi.string().email().required().min(5).max(255),
        age:Joi.number().integer().max(100).min(16).required(),
        gender: Joi.string().valid('Male', 'Female','male','female').required(),
        photo:Joi.binary(),
        company_name:Joi.string().min(3).max(45)
    })
    return Schema.validate(body);
    }
    static validateEditingCustomer = (body)=>{
      const Schema=Joi.object().keys({
        first_name:Joi.string().min(3).max(45),
        last_name:Joi.string().min(3).max(45),
        phone:Joi.string().min(10).max(45),
        email:Joi.string().email().min(5).max(255),
        age:Joi.number().integer().max(100).min(16),
        gender: Joi.string().valid('Male', 'Female','male','female'),
        photo:Joi.binary(),
        company_name:Joi.string().min(3).max(45)
    })
    return Schema.validate(body);
    }
  }
  Customer.init({
    first_name: { 
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Customer must have a first name.'},
        notEmpty:{msg:'First name must not be empty.'}
      }
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Customer must have a last name.'},
        notEmpty:{msg:'Last name must not be empty.'}
      }
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Customer must have a phone.'},
        notEmpty:{msg:'phone must not be empty.'}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{msg:'Customer must have an email.'},
        notEmpty:{msg:'Email must not be empty.'},
        isEmail:{msg:'Email must be a valid email.'},
      },
    },
    age: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Customer must have an age.'},
        notEmpty:{msg:'Age must not be empty.'}
      }
    },
    gender: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Customer must have a gender.'},
        notEmpty:{msg:'Gender must not be empty.'}
      }
    },
    photo: DataTypes.BLOB,
    company_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Customer must have a company name.'},
        notEmpty:{msg:'Company name must not be empty.'}
      }
    }
  },{
    sequelize,
    timestamps:false,
    tableName:'customers',
    modelName: 'Customer',
  });
  Customer.prototype.generateAuthToken = (id)=>{
    const token = jwt.sign({id},config.get('jwtPrivateKey'))
    return token
  }
  return Customer;
 
};