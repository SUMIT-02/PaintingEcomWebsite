const Filters = require("../models/Filters");

exports.addFilters = (req, res) => {
  const { categoryName, type } = req.body;

  const allowedFilters = ["DRAWING", "PAINTING", "MEDIUM", "SURFACE"];
  // const allowedFilters = ["MEDIUM", "SURFACE"];

  if (allowedFilters.indexOf(type) === -1)
    return res.send({ err: "Enter the valid filter" });

  Filters.findOneAndUpdate(
    { type },
    { $push: { categories: { categoryName } } },
    { new: true }
  )
    .then((cate) => {
      if (!cate)
        return res.send({
          msg: "Main category created - now add the sub categories",
          cate,
        });
      res.send({ msg: "Category filter added successfully" });
    })
    .catch((err) => {
      return res.send({ err: "Something went wrong" });
    });
};

exports.getFilters = (req, res) => {
  Filters.find({ type: req.params.type.toUpperCase() })
    .then((cate) => {
      res.send(cate);
    })
    .catch((err) => {
      return res.send({ err: "Something went wrong" });
    });
};

exports.getAllFilters = (req, res) => {
  Filters.find()
    .then((cate) => {
      res.send(cate);
    })
    .catch((err) => {
      return res.send({ err: "Something went wrong" });
    });
};
