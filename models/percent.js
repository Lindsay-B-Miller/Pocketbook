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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Percents.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Percents;
};
