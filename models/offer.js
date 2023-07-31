'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project}) {
      // define association here
      // this.hasMany(Project_offer,{foreignKey:'id_offer',as:'offer'})
      this.belongsToMany(Project,{through:'Project_offer',foreignKey:'id_offer'})
    }
    toJSON(){
      return {...this.get(),id:undefined,Project_offer:undefined}
    }
    static validateOffer = (body)=>{
      const Schema=Joi.object().keys({
        name:Joi.string().min(3).max(45),
    })
    return Schema.validate(body);
    }
  }
  Offer.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'Offer must have a name.'},
        notEmpty:{msg:'Name must not be empty.'}
      }
    }
  }, {
    sequelize,
    timestamps:false,
    tableName:'offers',
    modelName: 'Offer',
  });
  return Offer;
};