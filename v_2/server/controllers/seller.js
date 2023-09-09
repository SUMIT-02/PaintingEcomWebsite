const PaintingSchema = require("../models/PaintingSchema");
const SellerBankDetails = require("../models/SellerPayment");
const Seller = require("../models/Users");
const path = require("path");

exports.addbankDetails = (req, res) => {
  const { accountNumber, ifscCode, userId, accountName } = JSON.parse(
    JSON.stringify(req.body)
  );
  let profileUpdated = false;

  if (req.file?.filename) {
    console.log("FILE_UPLOADED_SELLER_PATHNAME>>>>", req.file.path);

    Seller.findOneAndUpdate(
      { _id: userId },
      { $set: { profileImage: req.file.filename } },
      { new: true }
    ).then((data) => {
      if (!data) return;
      profileUpdated = true;
    });
  }

  const sellerDetails = new SellerBankDetails({
    accountNumber,
    ifscCode,
    userId,
    accountName,
  });

  sellerDetails
    .save()
    .then((data) => {
      if (!data)
        return res.status(400).send({
          err: "Something went wrong please try after some time",
        });
      Seller.findOneAndUpdate(
        { _id: userId },
        { $set: { sellerOnboarded: true } },
        { new: true }
      ).then((data) => {
        if (!data)
          return res.status(400).send({
            err: "Something went wrong please try after some time",
          });
        res.status(200).send({
          msg: `${
            profileUpdated ? "Profile updated successfully and " : ""
          }Seller onboarded successfully`,
          user: data,
        });
      });
    })
    .catch((err) => {
      return res.status(400).send({
        err: "Something went wrong please try after some time",
      });
    });
};

exports.getSellerProfileImage = (req, res) => {
  const pathname = path.join(
    __dirname,
    "../uploads/seller-profile",
    `/${req.query.filename}`
  );
  console.log("FILE_UPLOADED_SELLER_PATHNAME>>>>", pathname);
  res.sendFile(pathname);
};

exports.getSellerPaintings = (req, res) => {
  PaintingSchema.find({ userId: req.params.id })
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(400).send({
          err: "Looks like painter don't have any paintings",
        });
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        err: "Unable to fetch paintings pls try after sometime",
      });
    });
};

exports.getAllSellers = (req, res) => {
  Seller.find()
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(400).send({
          err: "Looks like painter don't have any sellers registered",
        });
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(400).send({
        err: "Unable to fetch sellers details pls try after sometime",
      });
    });
};
