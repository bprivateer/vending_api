'use strict';
module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define('Purchase', {
    nameOfItem: DataTypes.STRING,
    quantityOf: DataTypes.INTEGER,
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW
  }, {

      Purchase.associate = (function(models){
        Purchase.belongsTo(models.Item, { as: 'Items', foreignKey: 'itemId'})
      })

  });
  return Purchase;
};
