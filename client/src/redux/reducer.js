import {
  GETALLUSERS,
  DELETEUSERS,
  SEARCH_USERS,
  CREATE_USER,
  EDITUSERS,
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
        auxUsers: action.payload,
        loading: false,
      };
    case CREATE_USER:
      return {
        ...state,
        auxUsers: [...state.usersRender, action.payload],
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
