const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

// Configuracion de Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use("/", router);
app.get("/health", (_req, res) => {
  res.status(200).json("success");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Success");
});
