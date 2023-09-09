const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  uploadPainting,
  getPaintingImage,
  getPaintingDetails,
  getAllPaintings,
  updatePainting,
  deletePainting,
  getAllPaintingsLimit,
  getAllPaintingsOffers,
} = require("../controllers/paintings");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createFolder();

    const pathname = path.join(__dirname, "../uploads/seller-uploads");
    return cb(null, `${pathname}`);
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/uploadPainting", upload.single("paintingImage"), uploadPainting);
router.get("/getPaintingImage", getPaintingImage);
router.get("/getPaintingDetails/:paintingId", getPaintingDetails);
router.get("/getAllPaintings", getAllPaintings);
router.get("/getAllPaintings/limit", getAllPaintingsLimit);
router.get("/getAllPaintings/offers", getAllPaintingsOffers);
router.patch(
  "/updatePainting/:paintingId",
  upload.single("paintingImage"),
  updatePainting
);
router.delete(
  "/deletePainting/:paintingId",

  deletePainting
);

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
  const folderName2 = path.join(__dirname, "../uploads/seller-uploads");
  try {
    if (!fs.existsSync(folderName2)) {
      fs.mkdirSync(folderName2);
    }
  } catch (err) {
    console.error(err);
  }
};
