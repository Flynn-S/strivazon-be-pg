const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required",
        },
        is: {
          args: ["^[a-z]+$", "i"],
          msg: "Only letters allowed",
        },
        len: {
          args: [1, 150],
          msg: "Content must be less than 150 characters",
        },
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Article;
};
