const express = require("express");
const {
  addbankDetails,
  getSellerProfileImage,
  getSellerPaintings,
  getAllSellers,
} = require("../controllers/seller");
const router = express.Router();
const fs = require("fs");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createFolder();
    const pathname = path.join(__dirname, "../uploads/seller-profile");
    return cb(null, `${pathname}`);
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/sellerBankRegistration",
  upload.single("sellerProfile"),
  addbankDetails
);
router.get("/getSellerProfileImage", getSellerProfileImage);
router.get("/getSellerPaintings/:id", getSellerPaintings);
router.get("/getAllSellers", getAllSellers);

module.exports = router;

const createFolder = () => {
  const folderName = path.join(__dirname, "../uploads");
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
  const folderName2 = path.join(__dirname, "../uploads/seller-profile");
  try {
    if (!fs.existsSync(folderName2)) {
      fs.mkdirSync(folderName2);
    }
  } catch (err) {
    console.error(err);
  }
};
