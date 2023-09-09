const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paintingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    offerPrice: {
      type: Number,
      default:0,
      maxlength: 32,
      trim: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    // FIXME - use multer path to store the image
    fileName: {
      type: String,
    },
    size: {
      type: String,
      trim: true,
      required: true,
    },

    medium: {
      type: String,
      trim: true,
      required: true,
    },
    typeCategory: {
      type: String,
      trim: true,
      required: true,
    },
    surface: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    createdIn: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);
