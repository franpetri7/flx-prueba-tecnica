import {
  GETALLUSERS,
  DELETEUSERS,
  SEARCH_USERS,
  EDITUSERS,
  FILTER_USERS,
  GETUSERBYID,
} from "./actionsType";
import axios from "axios";
const server = "http://localhost:3000/users";
export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const { data } = await axios.get(`http://localhost:3000/users`);
      return dispatch({
        type: GETALLUSERS,
        payload: data,
      });
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
        payload: data.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const deleteUser = (selectedUserId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/users/${selectedUserId}`
      );
      return dispatch({
        type: DELETEUSERS,
        payload: data.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const searchUsers = (searcher) => {
  return async (dispatch) => {
    dispatch(loading());
    const { data } = await axios.get(
      `http://localhost:3000/users/filter?q=${searcher}`
    );
    console.log(data);
    dispatch({
      type: SEARCH_USERS,
      payload: data,
    });
  };
};

export const filterUsers = (status) => {
  return async (dispatch) => {
    const data = await axios.get(
      `http://localhost:3000/users/filterStatus?status=${status}`
    );
    const users = data.data;
    dispatch({
      type: FILTER_USERS,
      payload: users,
    });
  };
};

export function createUser(payload) {
  return function (dispatch) {
    dispatch(loading());
    return fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) =>
        setTimeout(() => {
          dispatch({ type: "CREATE_USER", payload: data });
        }, 2000)
      )
      .catch((err) => console.log(err));
  };
}

export function updateUser(id, user) {
  return function (dispatch) {
    dispatch(loading());
    return fetch(server + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) =>
        setTimeout(() => {
          dispatch({ type: EDITUSERS, payload: data });
        }, 2000)
      )
      .catch((err) => console.log(err));
  };
}

export function loading() {
  return { type: "LOADING" };
}

// import {
//   GETALLUSERS,
//   DELETEUSERS,
//   SEARCH_USERS,
//   EDITUSERS,
//   FILTER_USERS,
//   GETUSERBYID,
//   CREATE_USER,
//   LOADING,
// } from "./actionsType";
// import axios from "axios";
// const server = "http://localhost:3000/users";

// export const getUserById = (selectedUserId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:3000/users/${selectedUserId}`
//       );
//       return dispatch({
//         type: GETUSERBYID,
//         payload: data.data,
//       });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };

// export const filterUsers = (status) => {
//   return async (dispatch) => {
//     const data = await axios.get(
//       `http://localhost:3000/users/filterStatus?status=${status}`
//     );
//     const users = data.data;
//     dispatch({
//       type: FILTER_USERS,
//       payload: users,
//     });
//   };
// };

// export function getUsers() {
//   return function (dispatch) {
//     dispatch(loading());
//     fetch(server)
//       .then((res) => res.json())
//       .then((res) => {
//         setTimeout(() => {
//           dispatch({ type: GETALLUSERS, payload: res });
//         }, 2000);
//       });
//   };
// }

// export function searchUsers(data) {
//   return function (dispatch) {
//     dispatch(loading());
//     setTimeout(() => {
//       dispatch({ type: SEARCH_USERS, payload: data });
//     }, 2000);
//   };
// }

// export function createUser(payload) {
//   return function (dispatch) {
//     dispatch(loading());
//     return fetch(server, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => response.json())
//       .then((data) =>
//         setTimeout(() => {
//           dispatch({ type: CREATE_USER, payload: data });
//         }, 2000)
//       )
//       .catch((err) => console.log(err));
//   };
// }

// export function deleteUser(id) {
//   return function (dispatch) {
//     dispatch(loading());
//     return fetch(server + `/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) =>
//         setTimeout(() => {
//           dispatch({ type: DELETEUSERS, payload: data });
//         }, 2000)
//       )
//       .catch((err) => console.log(err));
//   };
// }

// export function updateUser(id, user) {
//   return function (dispatch) {
//     dispatch(loading());
//     return fetch(server + `/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(user),
//     })
//       .then((response) => response.json())
//       .then((data) =>
//         setTimeout(() => {
//           dispatch({ type: EDITUSERS, payload: data });
//         }, 2000)
//       )
//       .catch((err) => console.log(err));
//   };
// }

// export function loading() {
//   return { type: LOADING };
// }
