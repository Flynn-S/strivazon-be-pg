import { v4 as uuidv4 } from "uuid";

const express = require("express");

const Product = require("../../db").Product;
const Review = require("../../db").Review;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({ include: Review });
      res.status(200).send(products);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const products = await Product.bulkCreate([
        {
          title: "Product 1",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 2",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 3",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 4",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 5",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 6",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 7",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
        {
          title: "Product 8",
          content:
            "a whole bunch of random text fkdjfshdakalfjshfd fsef sfkasdjafalsjfjlkejf dfsa.",
        },
      ]);
      res.send(products);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (e) {
      console.log(e);
    }
  });

router.route("/:productId/reviews/:reviewId").post(async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const result = await Product.addReview(req.params.reviewId);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const product = await Product.update(req.body, {
        where: { _id: req.params.id },
        returning: true,
      });
      res.send(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({ where: { _id: req.params.id } });
      if (rows > 0) {
        res.send("delete successful");
      } else {
        res.status(404).send("Not found");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
