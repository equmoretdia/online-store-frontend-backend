require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const deviceRouter = require("./routes/deviceRouter");
const userRouter = require("./routes/userRouter");
const brandRouter = require("./routes/brandRouter");
const typeRouter = require("./routes/typeRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(fileUpload({}));
app.use("/api/user", userRouter);
app.use("/api/type", typeRouter);
app.use("/api/brand", brandRouter);
app.use("/api/device", deviceRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "it's working!" });
// });

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

//the last middleware is the error handling one
app.use((err, req, res, next) => {
  // default values are set to prevent the situation when
  // the error thrown doesn't have an explicit status code
  //  set, 'RangeError[ERR_HTTP_INVALID_STATUS_CODE]:
  // Invalid status code: undefined' occurrance
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  console.log(err);
});

module.exports = app;
