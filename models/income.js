module.exports = function(sequelize, DataTypes) {
  var Income = sequelize.define("Income", {
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

  Income.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Income.belongsTo(models.user, {
      foreignKey: "userId",
      targetKey: "id"
    });
  };
  return Income;
};
