module.exports = function(sequelize, DataTypes) {
  var Percents = sequelize.define("Percents", {
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

  Percents.associate = function(models) {
    Percents.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Percents;
};
