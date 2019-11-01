module.exports = function(sequelize, DataTypes) {
  var Bills = sequelize.define("Bills", {
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notNull: true
      }
    },
    amount: {
      type: DataTypes.DECIMAL(38, 2),
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true
      }
    }
  });

  Bills.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Bills.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bills;
};
