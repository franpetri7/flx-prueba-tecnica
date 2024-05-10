import {
  GETALLUSERS,
  DELETEUSERS,
  SEARCH_USERS,
  CREATE_USER,
  FILTER_USERS,
  EDITUSERS,
  GETUSERBYID,
  LOADING,
} from "./actionsType";

const initialState = {
  allUsers: [],
  auxUsers: [],
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLUSERS:
      return {
        ...state,
        allUsers: action.payload,
        auxUsers: action.payload,
        loading: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
      };
    case GETUSERBYID:
      return {
        ...state,
        auxUsers: action.payload,
        loading: false,
      };
    case FILTER_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
      };
    case CREATE_USER:
      return {
        ...state,
        loading: false,
      };
    case EDITUSERS:
      return {
        ...state,
        loading: false,
      };
    case DELETEUSERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
