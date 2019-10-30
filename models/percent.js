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
    percent: {
      type: DataTypes.DECIMAL(2, 2),
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true
      }
    }
  });
  return Bills;
};
