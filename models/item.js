'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW
  }, {

      Item.associate = function(models){
        Item.hasMany(models.Purchase,{ as: 'Purchases', foreignKey: 'itemId'})
      }

  });
  return Item;
};
