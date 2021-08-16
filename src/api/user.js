import axios from "axios";
import {baseEndPointUrl} from "../utils/constants"

export const loginApi = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseEndPointUrl}/user/login`, {
      email,
      password
    }).then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const createUser = data => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseEndPointUrl}/user/create`, data)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getAllUsers = data => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/user/all`, data)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const deleteUser = id => {
  return new Promise((resolve, reject) => {
    axios.delete(`${baseEndPointUrl}/user/delete?id=${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getProfile = id => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/user/profile/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const updateUser = data => {
  return new Promise((resolve, reject) => {
    axios.put(`${baseEndPointUrl}/user/update`, data)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getDashboardData = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/user/dashboard`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const userReportDetails = id => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/user/userReportDetails/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
