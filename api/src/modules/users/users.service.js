const axios = require("axios");
const URL = "http://localhost:3000/users";

const getAllUsersFromDB = async (page, limit) => {
  try {
    const data = await axios.get(`${URL}?_page=${page}&_limit=${limit}`);
    const totalCount = data.headers["x-total-count"];
    const users = data.data;
    return { users, totalCount };
  } catch (error) {
    throw error;
  }
};

const updateUsersInDB = async (id, data) => {
  try {
    const user = await axios.get(`${URL}/${id}`);
    const currentUserData = user.data;
    const updatedUserData = {
      ...currentUserData,
      ...data,
    };
    const response = await axios.put(`${URL}/${id}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const CreateUsersInDB = async (data) => {
  try {
    const { username, name, lastname, email, status, age } = data;
    const UserData = {
      username: username,
      name: name,
      lastname: lastname,
      email: email,
      status: status,
      age: age,
    };

    const response = await axios.post(`${URL}`, UserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByIdIndb = async (id) => {
  try {
    const data = await axios.get(`${URL}/${id}`);
    const users = data.data;
    return users;
  } catch (error) {
    throw error;
  }
};

const deleteUserInDB = async (id) => {
  try {
    const deletedProduct = await axios.delete(`${URL}/${id}`);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

const getUsersInDB = async (searcher) => {
  try {
    let query = `${URL}?q=${searcher}`;

    const response = await axios.get(query);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByStatusInDB = async (status) => {
  try {
    let query = `${URL}?status=${status}`;

    const response = await axios.get(query);

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsersFromDB,
  updateUsersInDB,
  CreateUsersInDB,
  deleteUserInDB,
  getUsersInDB,
  getUserByIdIndb,
  getUserByStatusInDB,
};
