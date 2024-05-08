const express = require("express");
const userRouter = require("../modules/users/users.router");

const router = express.Router();
// USER
router.use("/users", userRouter);

module.exports = router;
