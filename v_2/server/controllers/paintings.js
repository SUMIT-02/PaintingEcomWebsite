const path = require("path");
const Painting = require("../models/PaintingSchema");

exports.uploadPainting = (req, res) => {
  const {
    userId,
    name,
    description,
    price,
    size,
    medium,
    type,
    typeCategory,
    surface,
    createdIn,
    offerPrice,
    stock,
  } = JSON.parse(JSON.stringify(req.body));

  const painting = new Painting({
    userId,
    name,
    description,
    price,
    size,
    medium,
    surface,
    typeCategory,
    type,
    fileName: req.file.filename,
    sold: 0,
    createdIn,
    offerPrice,
    stock,
  });

  painting
    .save()
    .then((data) => {
      if (!data)
        return res
          .status(400)
          .send({ err: "Something went wrong please try after some time" });
      console.log("FILE_UPLOADED_>>>>", req.file.path);

      return res.status(200).send({
        msg: "File uploaded Successfully",
        fileName: req.file.filename,
        id: data._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .send({ err: "Something went wrong please try after some time - err" });
    });
};

exports.getPaintingImage = (req, res) => {
  const pathname = path.join(
    __dirname,
    "../uploads/seller-uploads",
    `/${req.query.filename}`
  );
  console.log("FILE_UPLOADED_PATHNAME_REQ>>>>", pathname);
  return res.sendFile(pathname);
};

exports.getPaintingDetails = (req, res) => {
  const { paintingId } = req.params;
  Painting.findOne({ _id: paintingId })
    .then((painting) => {
      if (!painting)
        return res.status(400).send({ err: "Unable to find the painting" });

      res.send(painting);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .send({ err: "Something went wrong please try after some time - err" });
    });
};

exports.getAllPaintings = (req, res) => {
  Painting.find()
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(400).send({
          err: "No Paintings found",
        });
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(400).send({
        err: "Unable to fetch paintings pls try after sometime",
      });
    });
};

exports.updatePainting = (req, res) => {
  const {
    name,
    description,
    price,
    size,
    medium,
    type,
    typeCategory,
    surface,
    createdIn,
    offerPrice,
    stock,
    fileName,
  } = JSON.parse(JSON.stringify(req.body));

  Painting.findByIdAndUpdate(
    req.params.paintingId,
    {
      $set: {
        name,
        description,
        price,
        size,
        medium,
        type,
        typeCategory,
        surface,
        createdIn,
        offerPrice: offerPrice === "null" ? 0 : offerPrice,
        stock,
        fileName: req?.file?.filename ? req.file.filename : fileName,
      },
    },
    { new: true }
  )
    .then((data) => {
      if (!data)
        return res
          .status(400)
          .send({ err: "Something went wrong please try after some time" });

      return res.status(200).send({
        msg: "Painting updated Successfully",
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ err: "Something went wrong please try after some time - err" });
    });
};

exports.deletePainting = (req, res) => {
  Painting.findByIdAndDelete(req.params.paintingId)
    .then(() => {
      return res.status(200).send({
        msg: "Painting deleted Successfully",
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ err: "Something went wrong please try after some time - err" });
    });
};

exports.getAllPaintingsLimit = (req, res) => {
  const limit = req.query.limit;

  Painting.find()
    .limit(limit)
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(400).send({
          err: "No Paintings found",
        });
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(400).send({
        err: "Unable to fetch paintings pls try after sometime",
      });
    });
};
exports.getAllPaintingsOffers = (req, res) => {
  const limit = req.query.limit;
  Painting.find({ offerPrice: { $gt: 0 } })
    .limit(limit)
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(400).send({
          err: "No offers found",
        });
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(400).send({
        err: "Unable to fetch paintings pls try after sometime",
      });
    });
};
