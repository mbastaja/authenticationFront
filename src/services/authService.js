import axios from "axios";

const url = "http://localhost:3000/";
let config = {};
export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("vuex"));
  config = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };
};

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
  getToken();
  return axios.get(`${url}getuser`, config).then((response) => {
    return response.data;
  });
};
export const getAllUsers = async () => {
  getToken();
  return axios.get(`${url}getusers`, config).then((response) => {
    return response.data;
  });
};
export const adminDeleteUser = async (id) => {
  getToken();
  return axios.delete(`${url}admindelete/${id}`, config).then((response) => {
    return response.data;
  });
};
export const adminEditUser = async (requestData) => {
  getToken();
  return axios
    .patch(`${url}adminedit`, requestData, config)
    .then((response) => {
      return response.data;
    });
};
export const editUser = async (requestData) => {
  getToken();
  return axios.patch(`${url}edit`, requestData, config).then((response) => {
    return response.data;
  });
};
