const express = require("express");
const {
  addFilters,
  getFilters,
  getAllFilters,
} = require("../controllers/filters");
const router = express.Router();

router.post("/addFilter", addFilters);
router.get("/getFilter/:type", getFilters);
router.get("/getAllFilters", getAllFilters);

module.exports = router;
