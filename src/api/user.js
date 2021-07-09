import axios from "axios";
import {baseEndPointUrl} from "../utils/constants"

export const loginApi = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseEndPointUrl}/user/login`, {
      email,
      password
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
