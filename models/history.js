/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const History = sequelize.define('history', {
    'history_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'amount': {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      comment: "null"
    },
    'description': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'createdAt': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      comment: "null"
    },
    'updatedAt': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      comment: "null"
    },
    'send_to': {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      comment: "null",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    'send_from': {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      comment: "null",
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'history'
  });

  History.associate = function (models) {
    History.belongsTo(models.users, {
      foreignKey: {
        name: "send_to",
      },
      as: "sendTo",
    });
    History.belongsTo(models.users, {
      foreignKey: {
        name: "send_from",
      },
      as: "sendFrom",
    });
  };

  return History
};
