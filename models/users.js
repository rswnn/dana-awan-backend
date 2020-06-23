/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    'id': {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'username': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "null"
    },
    'phone_number': {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "null"
    },
    'pin': {
      type: DataTypes.STRING(6),
      allowNull: true,
      comment: "null"
    },
    'cash': {
      type: DataTypes.INTEGER(9),
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
    'level': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'users'
  });
  User.associate = function (models) {
    // User.hasMany(models.History, { as: 'send_to', foreignKey: 'user_id' })
    User.hasMany(models.history, { foreignKey: 'send_to' });
  };
  return User
};
