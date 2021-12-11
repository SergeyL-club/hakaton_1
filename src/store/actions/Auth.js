import axios from "../../axios/axios";
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "./actionTypes";

export function auth (login, password) {
    return async dispatch => {
        const responseToken = await axios.get(`account/auth?login=${String(login)}&password=${String(password)}`)
        if (responseToken.status === 200) {
            const responseUserInfo = await axios.get(`account/verifyToken`,
                {headers:{token: responseToken.data.data.token}}
            )
            if (responseUserInfo.status === 200) {
                localStorage.setItem("token", responseToken.data.data.token);
                localStorage.setItem('nickname', responseUserInfo.data.data.nickname)
                localStorage.setItem('email', responseUserInfo.data.data.email)
                dispatch(authSuccess(responseToken.data.data.token,
                  responseUserInfo.data.data.nickname,
                  responseUserInfo.data.data.email));
                // dispatch(authLogout(new Date(responseUserInfo.data.data.updatedAt)));
            }
        }
    }
}

export function authLogout(time) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
}

export function logout() {
    localStorage.removeItem("token");
    return {
    type: AUTH_LOGOUT,
    };
}

export function autoLogin() {
  var time = new Date(localStorage.getItem("time"));
  var time2 = time.setDate(time.getDate() + 1)
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem('nickname')
    const email = localStorage.getItem('email')
    if (!token) {
      dispatch(logout());
    } else {
        // console.log(new Date(time), time2 <= new Date());
      if (time2 <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token,
          nickname,
          email));
        // dispatch(
        //   authLogout((new Date().getTime() - time.getTime()) / 1000)
        // );
      }
    }
  };
}

export function authSuccess(token, nickname, email) {
  return {
    type: AUTH_SUCCESS,
    token,
    nickname,
    email
  };
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    error,
  };
}
