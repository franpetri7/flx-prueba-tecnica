const {
  getAllUsersFromDB,
  getUserByIdIndb,
  updateUsersInDB,
  CreateUsersInDB,
  deleteUserInDB,
  getUsersInDB,
  getUserByStatusInDB,
} = require("./users.service");

const getAllUsers = async (req, res) => {
  try {
    const { _page, _limit } = req.query;
    const response = await getAllUsersFromDB(_page, _limit);
    return res.status(200).json({
      users: response.users,
      total: response.totalCount,
      currentPage: _page,
      perPage: _limit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting users" });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getUserByIdIndb(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};
const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await updateUsersInDB(id, data);
    return res.status(202).json("User updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Error updating users" });
  }
};
const createUsers = async (req, res) => {
  const data = req.body;
  try {
    await CreateUsersInDB(data);
    return res.status(202).json("User created successfully");
  } catch (error) {
    res.status(500).json({ error: "Error creating users" });
  }
};
const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserInDB(id);
    return res.status(202).json("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Error deleting users" });
  }
};

const filterUsers = async (req, res) => {
  try {
    const { q, _page, _limit } = req.query;
    const users = await getUsersInDB(q, _page, _limit);
    return res.status(200).json({
      users: users.users,
      total: users.totalCount,
      currentPage: _page,
      perPage: _limit,
    });
  } catch (error) {
    console.error("Error filtering users:", error);
    res.status(500).json({ error: "Error filtering users" });
  }
};

const getUsersByStatus = async (req, res) => {
  try {
    const { status, _page, _limit } = req.query;
    const users = await getUserByStatusInDB(status, _page, _limit);
    return res.status(200).json({
      users: users.users,
      total: users.totalCount,
      currentPage: _page,
      perPage: _limit,
    });
  } catch (error) {
    console.error("Error getting users by status:", error);
    res.status(500).json({ error: "Error getting users by status" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUsers,
  createUsers,
  deleteUsers,
  filterUsers,
  getUsersByStatus,
};
