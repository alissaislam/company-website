'use strict';
const {
  Model
} = require('sequelize');
const Joi = require('joi')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer,State,Pay_plan,Offer,Technology,Employee}) {
      // define association here
      this.belongsTo(Customer,{foreignKey:'id_customer',as:'customer'})
      this.belongsTo(State,{foreignKey:'id_state',as:'state'})
      this.belongsTo(Pay_plan,{foreignKey:'id_pay_plan',as:'pay_plan'})
      this.belongsToMany(Offer,{through:'Project_offer',foreignKey:'id_project'})
      this.belongsToMany(Employee,{through:'Employee_project',foreignKey:'id_project'})
      this.belongsToMany(Technology,{through:'Project_technology',foreignKey:'id_project'})
    }
    toJSON(){
      return {...this.get(),Employee_project:undefined}
    }
    static validateCustomer = (body)=>{
      const Schema=Joi.object().keys({
        type:Joi.string().required().min(3).max(45),
        name:Joi.string().required().min(3).max(45),
        progress:Joi.number().required().min(10).max(45),
        cost:Joi.number().required().min(5).max(255),
    })
    return Schema.validate(body);
    }
  }
  Project.init({
    type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Project must have a type.'},
        notEmpty:{msg:'Type must not be empty.'}
      },
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Project must have a name.'},
        notEmpty:{msg:'Name must not be empty.'}
      },
    },
    progress: {
      type:DataTypes.DOUBLE,
      allowNull:false,
      validate:{
        notNull:{msg:'Project must have a progress.'},
        notEmpty:{msg:'Progress must not be empty.'},
        min:0,
        max:100
      }
    },
    cost: {
      type:DataTypes.DOUBLE,
      allowNull:false,
      validate:{
        notNull:{msg:'Project must have a cost.'},
        notEmpty:{msg:'Cost must not be empty.'}
      }
    },
  }, {
    sequelize,
    timestamps:false,
    tableName:'projects',
    modelName: 'Project',
  });
  return Project;
};