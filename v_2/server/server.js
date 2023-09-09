require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const DBSeed = require("./utils/seed");
// ROUTES IMPORT

// Database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());
app.use(cors());

// Preloadiong the filter data
DBSeed.modules.seedDB({
  drawing: "DRAWING",
  painting: "PAINTING",
  medium: "MEDIUM",
  surface: "SURFACE",
});

app.get("/check_page", (req, res) => {
  res.send("<H1>Server is up</H1>");
});

// ROUTES CALLING
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/filters"));
app.use("/api", require("./routes/painting"));
app.use("/api", require("./routes/seller"));
app.use("/api", require("./routes/orders"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
