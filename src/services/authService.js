import axios from "axios";

const url = "http://localhost:3000/";

export const login = async (requestData) => {
  return axios.post(`${url}login`, requestData).then((response) => {
    return response.data;
  });
};

export const signup = async (requestData) => {
  return axios.post(`${url}register`, requestData).then((response) => {
    return response.data;
  });
};
export const getUserById = async () => {
  let token = JSON.parse(localStorage.getItem("vuex"));
  let config = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };
  return axios.get(`${url}getuser`, config).then((response) => {
    return response.data;
  });
};
export const getAllUsers = async () => {
  let token = JSON.parse(localStorage.getItem("vuex"));
  let config = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };
  return axios.get(`${url}getusers`, config).then((response) => {
    return response.data;
  });
};
