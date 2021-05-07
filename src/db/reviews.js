module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5, // only allow values <= 23
        min: 1,
      },
    },
    comment: {
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
  });
  return Review;
};
