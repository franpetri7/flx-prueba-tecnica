import {
  GETALLUSERS,
  DELETEUSERS,
  CREATE_USER,
  SEARCH_USERS,
  EDITUSERS,
  FILTER_USERS,
  GETUSERBYID,
  LOADING,
} from "./actionsType";
import axios from "axios";
export const getUsers = (page, limit) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `http://localhost:3000/users/?_page=${page}&_limit=${limit}`
      );
      return setTimeout(() => {
        dispatch({ type: GETALLUSERS, payload: data });
      }, 2000);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const getUserById = (selectedUserId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/users/${selectedUserId}`
      );
      return dispatch({
        type: GETUSERBYID,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const deleteUser = (selectedUserId, users) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/users/${selectedUserId}`
      );
      const usersFilter = users.users.filter(
        (user) => user.id !== selectedUserId
      );
      return setTimeout(() => {
        dispatch({
          type: DELETEUSERS,
          payload: { total: (users.total - 1).toString(), users: usersFilter },
        });
      }, 2000);
    } catch (error) {
      alert(error);
    }
  };
};
export const searchUsers = (searcher, page, limit) => {
  return async (dispatch) => {
    dispatch(loading());
    const { data } = await axios.get(
      `http://localhost:3000/users/filter?q=${searcher}&_page=${page}&_limit=${limit}`
    );
    const users = data;
    dispatch({
      type: SEARCH_USERS,
      payload: users,
    });
  };
};

export const filterUsers = (status, page, limit) => {
  return async (dispatch) => {
    const data = await axios.get(
      `http://localhost:3000/users/filterStatus?status=${status}&_page=${page}&_limit=${limit}`
    );
    const users = data.data;
    dispatch({
      type: FILTER_USERS,
      payload: users,
    });
  };
};

export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const data = await axios.post(`http://localhost:3000/users`, userData);
      return setTimeout(() => {
        dispatch({ type: CREATE_USER, payload: data });
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  };
};

export const updateUser = (userId, userData) => {
  return async (dispatch) => {
    try {
      const data = await axios.put(
        `http://localhost:3000/users/${userId}`,
        userData
      );
      return setTimeout(() => {
        dispatch({ type: EDITUSERS, payload: data });
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  };
};

export function loading() {
  return { type: LOADING };
}
