const express = require("express");
const bookRoute = express.Router();
const { BookModel } = require("../modal/book.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

bookRoute.get("/", async (req, res) => {
  const { id } = req.params;
  const { category } = req.query;

  if (category) {
    try {
      const data = await BookModel.find({ category: category });
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  } else if (id) {
    const data = await BookModel.findById(id);
    res.status(200).send(data);
  } else if (category && author) {
    try {
      const data = await BookModel.findById({
        category: category,
        author: author,
      });
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  } else {
    try {
      const data = await BookModel.find();
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }
});

bookRoute.post("/", async (req, res) => {
  const { _id, title, author, category, price, quantity } = req.body;

  try {
    const book = new BookModel({
      _id,
      title,
      author,
      category,
      price,
      quantity,
    });

    await book.save();
    res.status(200).send({ msg: "post has been done" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

bookRoute.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const newdata = req.body;

  try {
    await BookModel.findByIdAndUpdate({ _id: id }, newdata);
    res.status(200).send({ msg: "data has been updated" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

bookRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await BookModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "data has been deleted" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = {
  bookRoute,
};
