module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              isEmail: true
          }
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
      },
      telephone: {
          type: DataTypes.STRING,
      },
      status: {
          type: DataTypes.STRING,
          defaultValue: null,
      },
      password: {
          type: DataTypes.STRING,
      }
  });
  return User;
};
