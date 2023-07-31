'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project}) {
      // define association here
      this.hasMany(Project,{foreignKey:'id_state',as:'states'})
    }
    toJSON(){
      return {...this.get()}
    }
  }
  State.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'State must have a name.'},
        notEmpty:{msg:'Name must not be empty'}
      }
    }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'State',
  });
  return State;
};