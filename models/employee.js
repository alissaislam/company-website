'use strict';
const {
  Model
} = require('sequelize');
const jwt =require('jsonwebtoken')
const config=require('config')
const Joi=require('joi')

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role ,Language,Technology,Project}) {

      this.belongsTo(Role,{foreignKey:'id_role',as:'role',sourceKey:'id'})
      this.belongsToMany(Language,{through:'Employee_language',foreignKey:'id_employee'})
      this.belongsToMany(Technology,{through:'Employee_technology',foreignKey:'id_employee'})
      this.belongsToMany(Project,{through:'Employee_project',foreignKey:'id_employee'})
      
    }
    static  generateAuthToken (id,role){
        const token = jwt.sign({id: id,role:role},config.get('jwtEmployeePrivetKey'));
        return token;
        }
      
    static validateEmployee(employee){
        const Schema=Joi.object().keys({
            first_name:Joi.string().required().min(3).max(45),
            last_name:Joi.string().required().min(3).max(45),
            phone:Joi.string().required().min(10).max(25),
            email:Joi.string().email().required().min(5).max(255),
            age:Joi.number().integer().max(100).min(16).required(),
            gender: Joi.string().valid('Male', 'Female').required(),
            salary: Joi.number().precision(2).min(100000).max(100000000).required(),
            skills:Joi.string().required().min(3).max(255),
            portfolio:Joi.string().uri().max(255).required(),
            photo:Joi.binary(),
            id_role:Joi.number().integer().required()
        })
        return Schema.validate(employee);
    }

    static validateEditeEmployee(employee){
        const Schema=Joi.object().keys({
            first_name:Joi.string().min(3).max(45),
            last_name:Joi.string().min(3).max(45),
            phone:Joi.string().min(10).max(25),
            email:Joi.string().email().min(5).max(255),
            age:Joi.number().integer().max(100).min(16),
            gender: Joi.string().valid('Male', 'Female'),
            salary: Joi.number().precision(2).min(100000).max(100000000),
            skills:Joi.string().min(3).max(255),
            portfolio:Joi.string().uri().max(255),
            photo:Joi.binary(),
            id_role:Joi.number().integer()
        })
        return Schema.validate(employee);
    }
        
    toJSON(){
        return {...this.get(),id:undefined,id_role:undefined}
      }
  }
  Employee.init({
    first_name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len: [2,45],
            notEmpty : true
        }
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty : true,
            len: [2,45]
        }
    },
    phone:{

        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len: [10,15],
            notEmpty:true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty : true,
            len: [0,255]
        }
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty : true,
            max:100
        }
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn: [['Male', 'Female','male', 'female']],
            notEmpty:true
        }
    },
    salary:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        validate:{
            max:100000000,
            min:100000,
            notEmpty:true
        }
    },
    skills:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            len: [0,1024]
        }
    },
    portfolio:{
        type:DataTypes.STRING,
        validate:{
            len: [0,1024],
        }
    },
    photo: DataTypes.BLOB,
    id_role:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
    
}, {
    sequelize,
    modelName: 'Employee',
    timestamps: false
  });
//    Employee.prototype.generateAuthToken= (id,role)=>{
//    const token = jwt.sign({id: id,role:role},config.get('jwtPrivetKey'));
//    return token;
//    }
// Employee.prototype.generateAuthToken = (id)=>{
//     const token = jwt.sign({id},config.get('jwtEmployeePrivateKey'))
//     return token
//   }
  return Employee;
};