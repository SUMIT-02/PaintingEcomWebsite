const mongoose = require("mongoose");

const filtersSchema = new mongoose.Schema(
  {
    categories: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Filters", filtersSchema);
