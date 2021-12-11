import axios from "../axios/axios";


export const auth = async (login, password, callback ) => {
  axios.get("/account/auth", {
    params: {
      login,
      password
    }
  })
  .then(res => {   
    if(res.status === 200) {
      let data = res.data.data;
      verify(data.token, (isAuth) => {
        callback(isAuth);
        return;
      });
    }
    callback(false);
    return;
  })
  .catch(e => {
    callback(false);
    return;
  });
}

export const verify = async (token, callback) => {
  axios.get("/account/verifyToken", {
    params: {
      token
    }
  })
  .then(resVerify => {
    if(resVerify.status === 200) {
      localStorage.setItem("token", token);
      let data = resVerify.data.data;
      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("email", data.email);
      callback(true);
      return;
    }
    callback(false);
    return;
  })
  .catch(e => {
    callback(false);
    return;
  });
}

export const reg = async (nickname, password, email, callback) => {
  axios.get("/account/registration", {
    params: {
      nickname: nickname,
      password: password,
      email: email
    }
  })
  .then(res => {
    if(res.status === 200) {
      let data = res.data.data;
      verify(data.token, (isAuth) => {
        callback(isAuth);
        return;
      });
    }
    callback(false);
    return;
  })
  .catch(e => {
    callback(false);
    return;
  });
}