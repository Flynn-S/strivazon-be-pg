const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { port: process.env.PGPORT, host: process.env.PGHOST, dialect: "postgres" }
);
const Product = require("./products")(sequelize, DataTypes);
const Review = require("./reviews")(sequelize, DataTypes);

Product.hasMany(Review);
Review.belongsTo(Product);

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log(e));

module.exports = { sequelize, Product, Review };
