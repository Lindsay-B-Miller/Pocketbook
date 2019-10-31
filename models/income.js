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
  return Income;
};
