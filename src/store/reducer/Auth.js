import { AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  token: null,
  isAuth: false,
  nickname: null,
  email: null,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        isAuth: true,
        nickname: action.nickname,
        email: action.email,
      };
    case AUTH_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuth: false,
        nickname: null,
        email: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}