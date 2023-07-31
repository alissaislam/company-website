'use strict';
const {
  Model
} = require('sequelize');
const Joi=require('joi')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee}) {
      this.hasMany(Employee,{foreignKey:'id_role',as:'roles',sourceKey:'id'})
    }

    static validateRole(role){
      const Schema=Joi.object().keys({
          name:Joi.string().required().min(3).max(45),
      })
      return Schema.validate(role);
  }

  static validateEditRole(role){
    const Schema=Joi.object().keys({
        name:Joi.string().required().min(3).max(45),
    })
    return Schema.validate(role);
}
toJSON(){
  return {...this.get()}
}
  }
  Role.init({
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
    modelName: 'Role',
    timestamps: false
  });
  return Role;
};