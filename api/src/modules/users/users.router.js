const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUsers,
  createUsers,
  deleteUsers,
  filterUsers,
  getUsersByStatus,
} = require("./users.controller");

const userRouter = express.Router();

//Users
userRouter.get("/", getAllUsers);
userRouter.put("/:id", updateUsers);
userRouter.post("/", createUsers);
userRouter.delete("/:id", deleteUsers);
userRouter.get("/filter", filterUsers);
userRouter.get("/filterStatus", getUsersByStatus);
userRouter.get("/:id", getUserById);

module.exports = userRouter;
