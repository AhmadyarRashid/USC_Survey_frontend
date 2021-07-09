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
