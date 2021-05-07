const express = require("express");

const services = require("./services");
const productsRouter = require("./services/products");
const reviewsRouter = require("./services/reviews");
const cartsRouter = require("./services/cart");

const cors = require("cors");
const db = require("./db");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", services);
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/cart", cartsRouter);

const port = process.env.PORT || 5000;

db.sync({ force: true }); // force true is so that it drops all the tables everytime the server restarts and creates them all over again.
server.listen(port, () => console.log("server is running: " + port));
server.on("error", (error) =>
  console.info(" ❌ Server is not running due to : ", error)
);
