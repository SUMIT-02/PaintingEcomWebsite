const Filters = require("../models/Filters");

function seedDB(types) {
  const { drawing, painting, medium, surface } = types;

  console.log("DB_SEEDING");

  Filters.findOne({ type: drawing }).then((cate) => {
    if (!cate) {
      const category = new Filters({ type: drawing });
      category.save().catch((err) => {
        return res.send({ err: "Something went wrong" });
      });
    }
  });
  Filters.findOne({ type: painting }).then((cate) => {
    if (!cate) {
      const category = new Filters({ type: painting });
      category.save().catch((err) => {
        return res.send({ err: "Something went wrong" });
      });
    }
  });
  Filters.findOne({ type: medium }).then((cate) => {
    if (!cate) {
      const category = new Filters({ type: medium });
      category.save().catch((err) => {
        return res.send({ err: "Something went wrong" });
      });
    }
  });
  Filters.findOne({ type: surface }).then((cate) => {
    if (!cate) {
      const category = new Filters({ type: surface });
      category.save().catch((err) => {
        return res.send({ err: "Something went wrong" });
      });
    }
  });
}

exports.modules = { seedDB };
